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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const local_storage_service_1 = require("./local-storage.service");
const public_decorator_1 = require("../common/decorators/public.decorator");
let StorageController = class StorageController {
    localStorageService;
    constructor(localStorageService) {
        this.localStorageService = localStorageService;
    }
    async getAsset(storageKey, res) {
        try {
            const { asset, stream } = await this.localStorageService.getByStorageKey(storageKey);
            res.setHeader('Content-Type', asset.mimeType);
            res.setHeader('Content-Length', asset.size);
            res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(asset.originalName)}"`);
            stream.pipe(res);
        }
        catch {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':storageKey'),
    (0, swagger_1.ApiOperation)({ summary: 'Baixar ou visualizar asset público' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asset retornado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Asset não encontrado' }),
    __param(0, (0, common_1.Param)('storageKey')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "getAsset", null);
exports.StorageController = StorageController = __decorate([
    (0, swagger_1.ApiTags)('Assets & Storage'),
    (0, common_1.Controller)('api/v1/assets'),
    __metadata("design:paramtypes", [local_storage_service_1.LocalStorageService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map