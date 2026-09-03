import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
export declare class CustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: CustomFieldsService);
    create(createDto: CreateCustomFieldDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        formatting: string | null;
        type: string;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        formatting: string | null;
        type: string;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        formatting: string | null;
        type: string;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    update(id: string, updateDto: UpdateCustomFieldDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        formatting: string | null;
        type: string;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    delete(id: string): Promise<void>;
}
