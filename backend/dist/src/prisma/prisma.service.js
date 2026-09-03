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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
require("dotenv/config");
const path = require("path");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const isSqlite = process.env.DATABASE_PROVIDER === 'sqlite' ||
    process.env.USE_TEST_DB === 'true' ||
    process.env.DATABASE_URL?.startsWith('file:');
function getPrismaClientClass() {
    if (isSqlite) {
        try {
            const generatedPath = path.resolve(process.cwd(), 'src/generated/prisma-test');
            return require(generatedPath).PrismaClient;
        }
        catch {
            try {
                return require('../generated/prisma-test').PrismaClient;
            }
            catch {
                return client_1.PrismaClient;
            }
        }
    }
    return client_1.PrismaClient;
}
const SelectedPrismaClient = getPrismaClientClass();
let PrismaService = PrismaService_1 = class PrismaService extends SelectedPrismaClient {
    logger = new common_1.Logger(PrismaService_1.name);
    apiKey;
    constructor() {
        if (isSqlite) {
            const sqlitePath = path.resolve(process.cwd(), 'prisma/tmp/test.db');
            super({
                datasources: {
                    db: {
                        url: `file:${sqlitePath}`,
                    },
                },
            });
        }
        else {
            super();
        }
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log(`Prisma successfully connected to the ${isSqlite ? 'SQLite (test/temp)' : 'MSSQL'} database.`);
        }
        catch (error) {
            this.logger.warn(`Could not connect to database at startup: ${error?.message || error}`);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Prisma disconnected from the database.');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map