import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './s3-storage.service';
import { StorageController } from './storage.controller';

@Module({
  controllers: [StorageController],
  providers: [LocalStorageService, S3StorageService, StorageService],
  exports: [StorageService, LocalStorageService, S3StorageService],
})
export class StorageModule {}
