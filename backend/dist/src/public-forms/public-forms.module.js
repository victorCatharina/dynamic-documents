"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicFormsModule = void 0;
const common_1 = require("@nestjs/common");
const public_forms_service_1 = require("./public-forms.service");
const public_forms_controller_1 = require("./public-forms.controller");
const submissions_module_1 = require("../submissions/submissions.module");
let PublicFormsModule = class PublicFormsModule {
};
exports.PublicFormsModule = PublicFormsModule;
exports.PublicFormsModule = PublicFormsModule = __decorate([
    (0, common_1.Module)({
        imports: [submissions_module_1.SubmissionsModule],
        controllers: [public_forms_controller_1.PublicFormsController],
        providers: [public_forms_service_1.PublicFormsService],
        exports: [public_forms_service_1.PublicFormsService],
    })
], PublicFormsModule);
//# sourceMappingURL=public-forms.module.js.map