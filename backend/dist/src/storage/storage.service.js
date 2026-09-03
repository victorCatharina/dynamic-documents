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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const local_storage_service_1 = require("./local-storage.service");
const s3_storage_service_1 = require("./s3-storage.service");
const http = require("http");
const https = require("https");
let StorageService = StorageService_1 = class StorageService {
    configService;
    localStorageService;
    s3StorageService;
    logger = new common_1.Logger(StorageService_1.name);
    activeStorage;
    constructor(configService, localStorageService, s3StorageService) {
        this.configService = configService;
        this.localStorageService = localStorageService;
        this.s3StorageService = s3StorageService;
        const driver = this.configService.get('storage.driver') || 'local';
        if (driver === 's3') {
            this.activeStorage = this.s3StorageService;
            this.logger.log('Storage initialized with S3 / MinIO driver');
        }
        else {
            this.activeStorage = this.localStorageService;
            this.logger.log('Storage initialized with Local Disk driver');
        }
    }
    async upload(fileBuffer, options) {
        return this.activeStorage.upload(fileBuffer, options);
    }
    async delete(assetId) {
        return this.activeStorage.delete(assetId);
    }
    async getSignedUrl(assetId, expiresInSeconds) {
        return this.activeStorage.getSignedUrl(assetId, expiresInSeconds);
    }
    async getObject(assetId) {
        return this.activeStorage.getObject(assetId);
    }
    async getStream(assetId) {
        return this.activeStorage.getStream(assetId);
    }
    async fetchRemoteAsset(urlStr) {
        let parsedUrl;
        try {
            parsedUrl = new URL(urlStr);
        }
        catch {
            throw new common_1.BadRequestException({
                code: 'INVALID_URL',
                message: 'URL fornecida é inválida',
            });
        }
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            throw new common_1.BadRequestException({
                code: 'SSRF_BLOCKED',
                message: 'Apenas protocolos HTTP e HTTPS são permitidos',
            });
        }
        const hostname = parsedUrl.hostname.toLowerCase();
        const isPrivate = hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '::1' ||
            hostname.startsWith('10.') ||
            hostname.startsWith('192.168.') ||
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
            hostname.endsWith('.internal') ||
            hostname.endsWith('.local');
        if (isPrivate) {
            throw new common_1.BadRequestException({
                code: 'SSRF_BLOCKED',
                message: 'Acesso a endereços de rede privada ou localhost é bloqueado',
            });
        }
        return new Promise((resolve, reject) => {
            const client = parsedUrl.protocol === 'https:' ? https : http;
            const req = client.get(urlStr, { timeout: 10000 }, (res) => {
                if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    this.fetchRemoteAsset(res.headers.location)
                        .then(resolve)
                        .catch(reject);
                    return;
                }
                if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
                    reject(new common_1.BadRequestException({
                        code: 'FETCH_FAILED',
                        message: `Falha ao baixar imagem/arquivo remoto. HTTP status: ${res.statusCode}`,
                    }));
                    return;
                }
                const mimeType = res.headers['content-type'] || 'application/octet-stream';
                const chunks = [];
                let totalSize = 0;
                const maxSize = 10 * 1024 * 1024;
                res.on('data', (chunk) => {
                    totalSize += chunk.length;
                    if (totalSize > maxSize) {
                        req.destroy();
                        reject(new common_1.BadRequestException({
                            code: 'FILE_TOO_LARGE',
                            message: 'Recurso remoto excede o tamanho máximo permitido (10MB)',
                        }));
                        return;
                    }
                    chunks.push(Buffer.from(chunk));
                });
                res.on('end', () => {
                    resolve({
                        buffer: Buffer.concat(chunks),
                        mimeType,
                    });
                });
            });
            req.on('timeout', () => {
                req.destroy();
                reject(new common_1.BadRequestException({
                    code: 'FETCH_TIMEOUT',
                    message: 'Tempo limite esgotado ao buscar recurso remoto',
                }));
            });
            req.on('error', (err) => {
                reject(new common_1.BadRequestException({
                    code: 'FETCH_ERROR',
                    message: `Erro ao buscar recurso remoto: ${err.message}`,
                }));
            });
        });
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        local_storage_service_1.LocalStorageService,
        s3_storage_service_1.S3StorageService])
], StorageService);
//# sourceMappingURL=storage.service.js.map