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
var S3StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const path = require("path");
let S3StorageService = S3StorageService_1 = class S3StorageService {
    prisma;
    configService;
    logger = new common_1.Logger(S3StorageService_1.name);
    s3Client;
    bucketName;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        const s3Config = this.configService.get('storage');
        this.bucketName = s3Config.bucket || 'documents';
        this.s3Client = new client_s3_1.S3Client({
            endpoint: s3Config.endpoint,
            region: s3Config.region || 'us-east-1',
            credentials: {
                accessKeyId: s3Config.accessKey || 'minioadmin',
                secretAccessKey: s3Config.secretKey || 'minioadmin',
            },
            forcePathStyle: s3Config.forcePathStyle ?? true,
        });
    }
    async upload(fileBuffer, options) {
        const ext = path.extname(options.originalName);
        const storageKey = `${(0, uuid_1.v4)()}${ext}`;
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: storageKey,
            Body: fileBuffer,
            ContentType: options.mimeType,
        }));
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
        this.logger.log(`Asset stored on S3/MinIO: ${asset.id} (${options.originalName})`);
        return asset;
    }
    async delete(assetId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (asset) {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: asset.storageKey,
            }));
            await this.prisma.asset.delete({
                where: { id: assetId },
            });
            this.logger.log(`Asset deleted from S3: ${assetId}`);
        }
    }
    async getSignedUrl(assetId, expiresInSeconds = 3600) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
                code: 'ASSET_NOT_FOUND',
                message: 'Asset não encontrado',
            });
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: asset.storageKey,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: expiresInSeconds });
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
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: asset.storageKey,
        });
        const response = await this.s3Client.send(command);
        const stream = response.Body;
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (err) => reject(err));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
        });
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
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucketName,
            Key: asset.storageKey,
        });
        const response = await this.s3Client.send(command);
        return response.Body;
    }
};
exports.S3StorageService = S3StorageService;
exports.S3StorageService = S3StorageService = S3StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], S3StorageService);
//# sourceMappingURL=s3-storage.service.js.map