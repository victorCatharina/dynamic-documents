import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { DocumentVersionsModule } from './document-versions/document-versions.module';
import { TemplatesModule } from './templates/templates.module';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { StorageModule } from './storage/storage.module';
import { RenderingModule } from './rendering/rendering.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { PublicFormsModule } from './public-forms/public-forms.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ImportModule } from './import/import.module';
import { AppLoggerService } from './common/logger/app-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DocumentsModule,
    DocumentVersionsModule,
    TemplatesModule,
    CustomFieldsModule,
    StorageModule,
    RenderingModule,
    SubmissionsModule,
    PublicFormsModule,
    ApiKeysModule,
    ImportModule,
  ],
  providers: [AppLoggerService],
})
export class AppModule {}
