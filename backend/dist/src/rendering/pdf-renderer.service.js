"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PdfDocumentRenderer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDocumentRenderer = void 0;
const common_1 = require("@nestjs/common");
const pdf_lib_1 = require("pdf-lib");
const template_types_1 = require("../templates/template.types");
const data_resolver_service_1 = require("./data-resolver.service");
const mask_service_1 = require("./mask.service");
const storage_service_1 = require("../storage/storage.service");
let PdfDocumentRenderer = PdfDocumentRenderer_1 = class PdfDocumentRenderer {
    dataResolver;
    maskService;
    storageService;
    logger = new common_1.Logger(PdfDocumentRenderer_1.name);
    constructor(dataResolver, maskService, storageService) {
        this.dataResolver = dataResolver;
        this.maskService = maskService;
        this.storageService = storageService;
    }
    async render(template, data = {}) {
        const pdfDoc = await pdf_lib_1.PDFDocument.create();
        const helvetica = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        const helveticaOblique = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaOblique);
        const helveticaBoldOblique = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBoldOblique);
        const times = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.TimesRoman);
        const timesBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.TimesRomanBold);
        const timesItalic = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.TimesRomanItalic);
        const courier = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Courier);
        const courierBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.CourierBold);
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
        const baseDimensions = template_types_1.PAGE_DIMENSIONS_PT[pageSize] || template_types_1.PAGE_DIMENSIONS_PT.A4;
        const pageWidth = pageOrientation === 'LANDSCAPE'
            ? baseDimensions.height
            : baseDimensions.width;
        const pageHeight = pageOrientation === 'LANDSCAPE'
            ? baseDimensions.width
            : baseDimensions.height;
        for (let i = 0; i < template.pages.length; i++) {
            const tplPage = template.pages[i];
            let pdfPage = pdfDoc.addPage([pageWidth, pageHeight]);
            if (tplPage.background?.assetId) {
                try {
                    const bgBuffer = await this.storageService.getObject(tplPage.background.assetId);
                    await this.renderBackground(pdfDoc, pdfPage, bgBuffer, pageWidth, pageHeight);
                }
                catch (error) {
                    this.logger.warn(`Could not load background asset ${tplPage.background.assetId}: ${error?.message || error}`);
                }
            }
            if (Array.isArray(tplPage.fields)) {
                for (const field of tplPage.fields) {
                    await this.renderField(pdfDoc, pdfPage, field, data, pageHeight, fonts);
                }
            }
        }
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
    async renderBackground(pdfDoc, pdfPage, bgBuffer, pageWidth, pageHeight) {
        try {
            let bgImage;
            try {
                bgImage = await pdfDoc.embedPng(bgBuffer);
            }
            catch {
                try {
                    bgImage = await pdfDoc.embedJpg(bgBuffer);
                }
                catch {
                    const srcPdf = await pdf_lib_1.PDFDocument.load(bgBuffer);
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
        }
        catch (e) {
            this.logger.warn(`Failed to render background image: ${e?.message || e}`);
        }
    }
    async renderField(pdfDoc, pdfPage, field, data, pageHeight, fonts) {
        const rawValue = this.dataResolver.resolveValue(data, field.key);
        const { x, y, width, height } = field.position;
        const pdfY = pageHeight - (y + height);
        if (field.type === 'IMAGE') {
            if (rawValue && typeof rawValue === 'string') {
                await this.renderImageField(pdfDoc, pdfPage, rawValue, x, pdfY, width, height);
            }
            return;
        }
        let displayValue = '';
        if (rawValue !== undefined && rawValue !== null) {
            if (field.type === 'DATE') {
                displayValue = this.maskService.formatDate(rawValue);
            }
            else if (field.type === 'NUMBER') {
                displayValue = this.maskService.formatNumber(rawValue, field.validation?.decimalPlaces);
            }
            else {
                displayValue = this.maskService.applyMask(rawValue, field.mask);
            }
        }
        if (!displayValue) {
            return;
        }
        const font = this.selectFont(field.style, fonts);
        const fontSize = field.style?.fontSize || 12;
        const fontColor = this.parseColor(field.style?.color);
        const alignment = field.style?.alignment || 'LEFT';
        const textWidth = font.widthOfTextAtSize(displayValue, fontSize);
        let textX = x;
        if (alignment === 'CENTER') {
            textX = x + Math.max(0, (width - textWidth) / 2);
        }
        else if (alignment === 'RIGHT') {
            textX = x + Math.max(0, width - textWidth);
        }
        const textHeight = font.heightAtSize(fontSize);
        const verticalAlignment = field.style?.verticalAlignment || 'TOP';
        let textY = pdfY + height - fontSize;
        if (verticalAlignment === 'CENTER') {
            textY = pdfY + (height - textHeight) / 2;
        }
        else if (verticalAlignment === 'BOTTOM') {
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
    async renderImageField(pdfDoc, pdfPage, imageSource, x, y, width, height) {
        try {
            let imageBuffer = null;
            if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
                const remote = await this.storageService.fetchRemoteAsset(imageSource);
                imageBuffer = remote.buffer;
            }
            else if (imageSource.startsWith('data:image/')) {
                const base64Data = imageSource.split(',')[1];
                if (base64Data) {
                    imageBuffer = Buffer.from(base64Data, 'base64');
                }
            }
            if (imageBuffer) {
                let embeddedImage;
                try {
                    embeddedImage = await pdfDoc.embedPng(imageBuffer);
                }
                catch {
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
        }
        catch (e) {
            this.logger.warn(`Failed to render image field: ${e?.message || e}`);
        }
    }
    selectFont(style, fonts) {
        const isBold = Boolean(style?.bold);
        const isItalic = Boolean(style?.italic);
        const fontFamily = (style?.fontFamily || 'Helvetica').toLowerCase();
        if (fontFamily.includes('times')) {
            if (isBold)
                return fonts.timesBold;
            if (isItalic)
                return fonts.timesItalic;
            return fonts.times;
        }
        if (fontFamily.includes('courier')) {
            if (isBold)
                return fonts.courierBold;
            return fonts.courier;
        }
        if (isBold && isItalic)
            return fonts.helveticaBoldOblique;
        if (isBold)
            return fonts.helveticaBold;
        if (isItalic)
            return fonts.helveticaOblique;
        return fonts.helvetica;
    }
    parseColor(hexOrRgb) {
        if (!hexOrRgb) {
            return (0, pdf_lib_1.rgb)(0, 0, 0);
        }
        const clean = hexOrRgb.trim();
        if (clean.startsWith('#')) {
            const hex = clean.slice(1);
            if (hex.length === 3) {
                const r = parseInt(hex[0] + hex[0], 16) / 255;
                const g = parseInt(hex[1] + hex[1], 16) / 255;
                const b = parseInt(hex[2] + hex[2], 16) / 255;
                return (0, pdf_lib_1.rgb)(r, g, b);
            }
            if (hex.length === 6) {
                const r = parseInt(hex.slice(0, 2), 16) / 255;
                const g = parseInt(hex.slice(2, 4), 16) / 255;
                const b = parseInt(hex.slice(4, 6), 16) / 255;
                return (0, pdf_lib_1.rgb)(r, g, b);
            }
        }
        return (0, pdf_lib_1.rgb)(0, 0, 0);
    }
};
exports.PdfDocumentRenderer = PdfDocumentRenderer;
exports.PdfDocumentRenderer = PdfDocumentRenderer = PdfDocumentRenderer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_resolver_service_1.DataResolverService,
        mask_service_1.MaskService,
        storage_service_1.StorageService])
], PdfDocumentRenderer);
//# sourceMappingURL=pdf-renderer.service.js.map