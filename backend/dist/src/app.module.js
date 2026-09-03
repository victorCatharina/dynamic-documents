"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const documents_module_1 = require("./documents/documents.module");
const document_versions_module_1 = require("./document-versions/document-versions.module");
const templates_module_1 = require("./templates/templates.module");
const custom_fields_module_1 = require("./custom-fields/custom-fields.module");
const storage_module_1 = require("./storage/storage.module");
const rendering_module_1 = require("./rendering/rendering.module");
const submissions_module_1 = require("./submissions/submissions.module");
const public_forms_module_1 = require("./public-forms/public-forms.module");
const api_keys_module_1 = require("./api-keys/api-keys.module");
const import_module_1 = require("./import/import.module");
const app_logger_service_1 = require("./common/logger/app-logger.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            documents_module_1.DocumentsModule,
            document_versions_module_1.DocumentVersionsModule,
            templates_module_1.TemplatesModule,
            custom_fields_module_1.CustomFieldsModule,
            storage_module_1.StorageModule,
            rendering_module_1.RenderingModule,
            submissions_module_1.SubmissionsModule,
            public_forms_module_1.PublicFormsModule,
            api_keys_module_1.ApiKeysModule,
            import_module_1.ImportModule,
        ],
        providers: [app_logger_service_1.AppLoggerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map