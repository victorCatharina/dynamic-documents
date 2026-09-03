import { Injectable } from '@nestjs/common';
import { PdfDocumentRenderer } from './pdf-renderer.service';
import { DocumentTemplate } from '../templates/template.types';

@Injectable()
export class RenderingService {
  constructor(private readonly pdfRenderer: PdfDocumentRenderer) {}

  async renderPdf(template: DocumentTemplate, data: Record<string, any>): Promise<Buffer> {
    return this.pdfRenderer.render(template, data);
  }
}
