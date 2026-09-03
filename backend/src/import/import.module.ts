import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { StorageModule } from '../storage/storage.module';
import { DocumentVersionsModule } from '../document-versions/document-versions.module';

@Module({
  imports: [StorageModule, DocumentVersionsModule],
  controllers: [ImportController],
  providers: [ImportService],
  exports: [ImportService],
})
export class ImportModule {}
