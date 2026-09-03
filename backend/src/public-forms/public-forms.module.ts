import { Module } from '@nestjs/common';
import { PublicFormsService } from './public-forms.service';
import { PublicFormsController } from './public-forms.controller';
import { SubmissionsModule } from '../submissions/submissions.module';

@Module({
  imports: [SubmissionsModule],
  controllers: [PublicFormsController],
  providers: [PublicFormsService],
  exports: [PublicFormsService],
})
export class PublicFormsModule {}
