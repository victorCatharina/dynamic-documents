import { PrismaService } from '../prisma/prisma.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
export declare class ApiKeysService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private hashKey;
    create(createDto: CreateApiKeyDto): Promise<{
        id: any;
        name: any;
        keyPrefix: any;
        apiKey: string;
        createdAt: any;
        expiresAt: any;
    }>;
    findAll(): Promise<any>;
    revoke(id: string): Promise<void>;
    validateKey(rawKey: string): Promise<any>;
}
