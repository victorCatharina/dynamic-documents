import { Injectable, Logger } from '@nestjs/common';
import {
  PDFDocument,
  StandardFonts,
  rgb,
  RGB,
  PDFFont,
  PDFPage,
} from 'pdf-lib';
import {
  DocumentTemplate,
  DocumentTemplateField,
  DocumentTemplatePage,
  PAGE_DIMENSIONS_PT,
  PageSizeType,
  PageOrientationType,
} from '../templates/template.types';
import { DataResolverService } from './data-resolver.service';
import { MaskService } from './mask.service';
import { StorageService } from '../storage/storage.service';

export interface DocumentRenderer {
  render(
    template: DocumentTemplate,
    data: Record<string, any>,
  ): Promise<Buffer>;
}

@Injectable()
export class PdfDocumentRenderer implements DocumentRenderer {
  private readonly logger = new Logger(PdfDocumentRenderer.name);

  constructor(
    private readonly dataResolver: DataResolverService,
    private readonly maskService: MaskService,
    private readonly storageService: StorageService,
  ) {}

  async render(
    template: DocumentTemplate,
    data: Record<string, any> = {},
  ): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();

    // Standard Font Matrix
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
    const helveticaBoldOblique = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

    const times = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    const courier = await pdfDoc.embedFont(StandardFonts.Courier);
    const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

    const fonts = {
      helvetica,
      helveticaBold,
      helveticaOblique,
      helveticaBoldOblique,
      times,
      timesBold,
      timesItalic,
      courier,
      courierBold,
    };

    const pageSize = template.page?.size || 'A4';
    const pageOrientation = template.page?.orientation || 'PORTRAIT';
    const baseDimensions = PAGE_DIMENSIONS_PT[pageSize] || PAGE_DIMENSIONS_PT.A4;

    const pageWidth =
      pageOrientation === 'LANDSCAPE'
        ? baseDimensions.height
        : baseDimensions.width;
    const pageHeight =
      pageOrientation === 'LANDSCAPE'
        ? baseDimensions.width
        : baseDimensions.height;

    for (let i = 0; i < template.pages.length; i++) {
      const tplPage = template.pages[i];
      let pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);

      // Draw background if configured
      if (tplPage.background?.assetId) {
        try {
          const bgBuffer = await this.storageService.getObject(
            tplPage.background.assetId,
          );
          await this.renderBackground(pdfDoc, pdfPage, bgBuffer, pageWidth, pageHeight);
        } catch (error: any) {
          this.logger.warn(
            `Could not load background asset ${tplPage.background.assetId}: ${error?.message || error}`,
          );
        }
      }

      // Render fields
      if (Array.isArray(tplPage.fields)) {
        for (const field of tplPage.fields) {
          await this.renderField(
            pdfDoc,
            pdfPage,
            field,
            data,
            pageHeight,
            fonts,
          );
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  private async renderBackground(
    pdfDoc: PDFDocument,
    pdfPage: PDFPage,
    bgBuffer: Buffer,
    pageWidth: number,
    pageHeight: number,
  ) {
    try {
      // Try embedding as PNG first, then JPG, then PDF page
      let bgImage: any;
      try {
        bgImage = await pdfDoc.embedPng(bgBuffer);
      } catch {
        try {
          bgImage = await pdfDoc.embedJpg(bgBuffer);
        } catch {
          // Try embedding PDF page
          const srcPdf = await PDFDocument.load(bgBuffer);
          if (srcPdf.getPageCount() > 0) {
            const [copiedPage] = await pdfDoc.copyPages(srcPdf, [0]);
            const embedded = await pdfDoc.embedPage(copiedPage);
            pdfPage.drawPage(embedded, {
              x: 0,
              y: 0,
              width: pageWidth,
              height: pageHeight,
            });
            return;
          }
        }
      }

      if (bgImage) {
        pdfPage.drawImage(bgImage, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });
      }
    } catch (e: any) {
      this.logger.warn(`Failed to render background image: ${e?.message || e}`);
    }
  }

  private async renderField(
    pdfDoc: PDFDocument,
    pdfPage: PDFPage,
    field: DocumentTemplateField,
    data: Record<string, any>,
    pageHeight: number,
    fonts: Record<string, PDFFont>,
  ) {
    const rawValue = this.dataResolver.resolveValue(data, field.key);
    const { x, y, width, height } = field.position;

    // Convert top-left coordinates to PDF bottom-left coordinates
    const pdfY = pageHeight - (y + height);

    if (field.type === 'IMAGE') {
      if (rawValue && typeof rawValue === 'string') {
        await this.renderImageField(pdfDoc, pdfPage, rawValue, x, pdfY, width, height);
      }
      return;
    }

    // Format text value based on type and masks
    let displayValue = '';
    if (rawValue !== undefined && rawValue !== null) {
      if (field.type === 'DATE') {
        displayValue = this.maskService.formatDate(rawValue);
      } else if (field.type === 'NUMBER') {
        displayValue = this.maskService.formatNumber(
          rawValue,
          field.validation?.decimalPlaces,
        );
      } else {
        displayValue = this.maskService.applyMask(rawValue, field.mask);
      }
    }

    if (!displayValue) {
      return;
    }

    // Select font family & weight
    const font = this.selectFont(field.style, fonts);
    const fontSize = field.style?.fontSize || 12;
    const fontColor = this.parseColor(field.style?.color);

    // Text alignment
    const alignment = field.style?.alignment || 'LEFT';
    const textWidth = font.widthOfTextAtSize(displayValue, fontSize);

    let textX = x;
    if (alignment === 'CENTER') {
      textX = x + Math.max(0, (width - textWidth) / 2);
    } else if (alignment === 'RIGHT') {
      textX = x + Math.max(0, width - textWidth);
    }

    // Vertical alignment / baseline
    const textHeight = font.heightAtSize(fontSize);
    const verticalAlignment = field.style?.verticalAlignment || 'TOP';
    let textY = pdfY + height - fontSize; // Default TOP

    if (verticalAlignment === 'CENTER') {
      textY = pdfY + (height - textHeight) / 2;
    } else if (verticalAlignment === 'BOTTOM') {
      textY = pdfY + 2;
    }

    pdfPage.drawText(displayValue, {
      x: textX,
      y: textY,
      size: fontSize,
      font,
      color: fontColor,
      maxWidth: width,
    });
  }

  private async renderImageField(
    pdfDoc: PDFDocument,
    pdfPage: PDFPage,
    imageSource: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    try {
      let imageBuffer: Buffer | null = null;

      if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
        const remote = await this.storageService.fetchRemoteAsset(imageSource);
        imageBuffer = remote.buffer;
      } else if (imageSource.startsWith('data:image/')) {
        const base64Data = imageSource.split(',')[1];
        if (base64Data) {
          imageBuffer = Buffer.from(base64Data, 'base64');
        }
      }

      if (imageBuffer) {
        let embeddedImage: any;
        try {
          embeddedImage = await pdfDoc.embedPng(imageBuffer);
        } catch {
          embeddedImage = await pdfDoc.embedJpg(imageBuffer);
        }

        if (embeddedImage) {
          pdfPage.drawImage(embeddedImage, {
            x,
            y,
            width,
            height,
          });
        }
      }
    } catch (e: any) {
      this.logger.warn(`Failed to render image field: ${e?.message || e}`);
    }
  }

  private selectFont(
    style: DocumentTemplateField['style'],
    fonts: Record<string, PDFFont>,
  ): PDFFont {
    const isBold = Boolean(style?.bold);
    const isItalic = Boolean(style?.italic);
    const fontFamily = (style?.fontFamily || 'Helvetica').toLowerCase();

    if (fontFamily.includes('times')) {
      if (isBold) return fonts.timesBold;
      if (isItalic) return fonts.timesItalic;
      return fonts.times;
    }

    if (fontFamily.includes('courier')) {
      if (isBold) return fonts.courierBold;
      return fonts.courier;
    }

    // Default: Helvetica
    if (isBold && isItalic) return fonts.helveticaBoldOblique;
    if (isBold) return fonts.helveticaBold;
    if (isItalic) return fonts.helveticaOblique;
    return fonts.helvetica;
  }

  private parseColor(hexOrRgb?: string): RGB {
    if (!hexOrRgb) {
      return rgb(0, 0, 0); // Default black
    }

    const clean = hexOrRgb.trim();
    if (clean.startsWith('#')) {
      const hex = clean.slice(1);
      if (hex.length === 3) {
        const r = parseInt(hex[0] + hex[0], 16) / 255;
        const g = parseInt(hex[1] + hex[1], 16) / 255;
        const b = parseInt(hex[2] + hex[2], 16) / 255;
        return rgb(r, g, b);
      }
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;
        return rgb(r, g, b);
      }
    }

    return rgb(0, 0, 0);
  }
}
