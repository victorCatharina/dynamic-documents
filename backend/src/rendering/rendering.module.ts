import { Module } from '@nestjs/common';
import { DataResolverService } from './data-resolver.service';
import { MaskService } from './mask.service';
import { PdfDocumentRenderer } from './pdf-renderer.service';
import { RenderingService } from './rendering.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [
    DataResolverService,
    MaskService,
    PdfDocumentRenderer,
    RenderingService,
  ],
  exports: [
    DataResolverService,
    MaskService,
    PdfDocumentRenderer,
    RenderingService,
  ],
})
export class RenderingModule {}
