import 'dotenv/config';
import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as MssqlPrismaClient } from '@prisma/client';
declare const SelectedPrismaClient: typeof MssqlPrismaClient;
export declare class PrismaService extends SelectedPrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    apiKey: any;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
export {};
