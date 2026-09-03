import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
export declare class ApiKeysController {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
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
}
