import { DocumentTemplate } from '../templates/template.types';
import { DataResolverService } from './data-resolver.service';
import { MaskService } from './mask.service';
import { StorageService } from '../storage/storage.service';
export interface DocumentRenderer {
    render(template: DocumentTemplate, data: Record<string, any>): Promise<Buffer>;
}
export declare class PdfDocumentRenderer implements DocumentRenderer {
    private readonly dataResolver;
    private readonly maskService;
    private readonly storageService;
    private readonly logger;
    constructor(dataResolver: DataResolverService, maskService: MaskService, storageService: StorageService);
    render(template: DocumentTemplate, data?: Record<string, any>): Promise<Buffer>;
    private renderBackground;
    private renderField;
    private renderImageField;
    private selectFont;
    private parseColor;
}
