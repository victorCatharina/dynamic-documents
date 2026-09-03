import { PdfDocumentRenderer } from './pdf-renderer.service';
import { DocumentTemplate } from '../templates/template.types';
export declare class RenderingService {
    private readonly pdfRenderer;
    constructor(pdfRenderer: PdfDocumentRenderer);
    renderPdf(template: DocumentTemplate, data: Record<string, any>): Promise<Buffer>;
}
