"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentVersionsModule = void 0;
const common_1 = require("@nestjs/common");
const document_versions_service_1 = require("./document-versions.service");
const document_versions_controller_1 = require("./document-versions.controller");
const templates_module_1 = require("../templates/templates.module");
let DocumentVersionsModule = class DocumentVersionsModule {
};
exports.DocumentVersionsModule = DocumentVersionsModule;
exports.DocumentVersionsModule = DocumentVersionsModule = __decorate([
    (0, common_1.Module)({
        imports: [templates_module_1.TemplatesModule],
        controllers: [document_versions_controller_1.DocumentVersionsController],
        providers: [document_versions_service_1.DocumentVersionsService],
        exports: [document_versions_service_1.DocumentVersionsService],
    })
], DocumentVersionsModule);
//# sourceMappingURL=document-versions.module.js.map