import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { CustomFieldDefinition } from '@prisma/client';
export declare class CustomFieldsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createDto: CreateCustomFieldDto): Promise<CustomFieldDefinition>;
    findAll(): Promise<CustomFieldDefinition[]>;
    findById(id: string): Promise<CustomFieldDefinition>;
    update(id: string, updateDto: UpdateCustomFieldDto): Promise<CustomFieldDefinition>;
    delete(id: string): Promise<void>;
}
