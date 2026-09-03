"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionsModule = void 0;
const common_1 = require("@nestjs/common");
const submissions_service_1 = require("./submissions.service");
const submissions_controller_1 = require("./submissions.controller");
const submission_validation_service_1 = require("./submission-validation.service");
const rendering_module_1 = require("../rendering/rendering.module");
const storage_module_1 = require("../storage/storage.module");
let SubmissionsModule = class SubmissionsModule {
};
exports.SubmissionsModule = SubmissionsModule;
exports.SubmissionsModule = SubmissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [rendering_module_1.RenderingModule, storage_module_1.StorageModule],
        controllers: [submissions_controller_1.SubmissionsController],
        providers: [submissions_service_1.SubmissionsService, submission_validation_service_1.SubmissionValidationService],
        exports: [submissions_service_1.SubmissionsService, submission_validation_service_1.SubmissionValidationService],
    })
], SubmissionsModule);
//# sourceMappingURL=submissions.module.js.map