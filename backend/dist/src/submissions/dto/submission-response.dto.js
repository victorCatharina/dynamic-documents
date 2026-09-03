"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionCreatedResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SubmissionCreatedResponseDto {
    submissionId;
    documentId;
    version;
    status;
    documentUrl;
}
exports.SubmissionCreatedResponseDto = SubmissionCreatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sub-123-uuid' }),
    __metadata("design:type", String)
], SubmissionCreatedResponseDto.prototype, "submissionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'doc-123-uuid' }),
    __metadata("design:type", String)
], SubmissionCreatedResponseDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], SubmissionCreatedResponseDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GENERATED' }),
    __metadata("design:type", String)
], SubmissionCreatedResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/api/v1/submissions/sub-123-uuid/document' }),
    __metadata("design:type", String)
], SubmissionCreatedResponseDto.prototype, "documentUrl", void 0);
//# sourceMappingURL=submission-response.dto.js.map