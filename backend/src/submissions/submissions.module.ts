import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { SubmissionValidationService } from './submission-validation.service';
import { RenderingModule } from '../rendering/rendering.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [RenderingModule, StorageModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionValidationService],
  exports: [SubmissionsService, SubmissionValidationService],
})
export class SubmissionsModule {}
