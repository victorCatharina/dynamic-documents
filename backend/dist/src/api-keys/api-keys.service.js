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
var ApiKeysService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto = require("crypto");
let ApiKeysService = ApiKeysService_1 = class ApiKeysService {
    prisma;
    logger = new common_1.Logger(ApiKeysService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    hashKey(rawKey) {
        return crypto.createHash('sha256').update(rawKey).digest('hex');
    }
    async create(createDto) {
        const randomSecret = crypto.randomBytes(24).toString('hex');
        const rawApiKey = `dd_live_${randomSecret}`;
        const keyHash = this.hashKey(rawApiKey);
        const keyPrefix = rawApiKey.slice(0, 15);
        const apiKeyRecord = await this.prisma.apiKey.create({
            data: {
                name: createDto.name,
                keyHash,
                keyPrefix,
                expiresAt: createDto.expiresAt ? new Date(createDto.expiresAt) : null,
            },
        });
        this.logger.log(`Created API Key: ${apiKeyRecord.id} (${apiKeyRecord.name})`);
        return {
            id: apiKeyRecord.id,
            name: apiKeyRecord.name,
            keyPrefix: apiKeyRecord.keyPrefix,
            apiKey: rawApiKey,
            createdAt: apiKeyRecord.createdAt,
            expiresAt: apiKeyRecord.expiresAt,
        };
    }
    async findAll() {
        return this.prisma.apiKey.findMany({
            select: {
                id: true,
                name: true,
                keyPrefix: true,
                lastUsedAt: true,
                expiresAt: true,
                revokedAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async revoke(id) {
        const key = await this.prisma.apiKey.findUnique({
            where: { id },
        });
        if (!key) {
            throw new common_1.NotFoundException({
                code: 'API_KEY_NOT_FOUND',
                message: 'API Key não encontrada',
            });
        }
        await this.prisma.apiKey.update({
            where: { id },
            data: { revokedAt: new Date() },
        });
        this.logger.log(`Revoked API Key: ${id}`);
    }
    async validateKey(rawKey) {
        if (!rawKey) {
            throw new common_1.UnauthorizedException({
                code: 'MISSING_API_KEY',
                message: 'API Key não fornecida no cabeçalho Authorization: Bearer <API_KEY>',
            });
        }
        const keyHash = this.hashKey(rawKey);
        const keyRecord = await this.prisma.apiKey.findUnique({
            where: { keyHash },
        });
        if (!keyRecord) {
            this.logger.warn('Failed API Key authentication: invalid key');
            throw new common_1.UnauthorizedException({
                code: 'INVALID_API_KEY',
                message: 'API Key inválida',
            });
        }
        if (keyRecord.revokedAt) {
            this.logger.warn(`Failed API Key authentication: revoked key (${keyRecord.id})`);
            throw new common_1.UnauthorizedException({
                code: 'API_KEY_REVOKED',
                message: 'API Key foi revogada',
            });
        }
        if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
            this.logger.warn(`Failed API Key authentication: expired key (${keyRecord.id})`);
            throw new common_1.UnauthorizedException({
                code: 'API_KEY_EXPIRED',
                message: 'API Key expirada',
            });
        }
        this.prisma.apiKey
            .update({
            where: { id: keyRecord.id },
            data: { lastUsedAt: new Date() },
        })
            .catch((err) => this.logger.warn(`Could not update lastUsedAt for key: ${err.message}`));
        return keyRecord;
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = ApiKeysService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiKeysService);
//# sourceMappingURL=api-keys.service.js.map