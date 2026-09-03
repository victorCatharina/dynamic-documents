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
var LocalStorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
let LocalStorageService = LocalStorageService_1 = class LocalStorageService {
    prisma;
    configService;
    logger = new common_1.Logger(LocalStorageService_1.name);
    uploadsDir;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.uploadsDir = path.resolve(process.cwd(), this.configService.get('storage.localPath') || './uploads');
        if (!fs.existsSync(this.uploadsDir)) {
            fs.mkdirSync(this.uploadsDir, { recursive: true });
        }
    }
    async upload(fileBuffer, options) {
        const ext = path.extname(options.originalName);
        const storageKey = `${(0, uuid_1.v4)()}${ext}`;
        const filePath = path.join(this.uploadsDir, storageKey);
        await fs.promises.writeFile(filePath, fileBuffer);
        const asset = await this.prisma.asset.create({
            data: {
                storageKey,
                originalName: options.originalName,
                mimeType: options.mimeType,
                size: fileBuffer.length,
                url: `/api/v1/assets/${storageKey}`,
                documentId: options.documentId || null,
            },
        });
        this.logger.log(`Asset stored locally: ${asset.id} (${options.originalName})`);
        return asset;
    }
    async delete(assetId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (asset) {
            const filePath = path.join(this.uploadsDir, asset.storageKey);
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
            await this.prisma.asset.delete({
                where: { id: assetId },
            });
            this.logger.log(`Asset deleted: ${assetId}`);
        }
    }
    async getSignedUrl(assetId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
        return `/api/v1/assets/${asset.storageKey}`;
    }
    async getObject(assetId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
        const filePath = path.join(this.uploadsDir, asset.storageKey);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException({
                code: 'FILE_NOT_FOUND',
                message: 'Arquivo físico não encontrado no storage',
            });
        }
        return fs.promises.readFile(filePath);
    }
    async getStream(assetId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
        const filePath = path.join(this.uploadsDir, asset.storageKey);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException({
                code: 'FILE_NOT_FOUND',
                message: 'Arquivo físico não encontrado no storage',
            });
        }
        return fs.createReadStream(filePath);
    }
    async getByStorageKey(storageKey) {
        const asset = await this.prisma.asset.findFirst({
            where: { storageKey },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
        const filePath = path.join(this.uploadsDir, asset.storageKey);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException({
                code: 'FILE_NOT_FOUND',
                message: 'Arquivo físico não encontrado no storage',
            });
        }
        return { asset, stream: fs.createReadStream(filePath) };
    }
};
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = LocalStorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], LocalStorageService);
//# sourceMappingURL=local-storage.service.js.map