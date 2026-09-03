import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
export declare class CustomFieldsController {
    private readonly customFieldsService;
    constructor(customFieldsService: CustomFieldsService);
    create(createDto: CreateCustomFieldDto): Promise<{
        formatting: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    findAll(): Promise<{
        formatting: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }[]>;
    findById(id: string): Promise<{
        formatting: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    update(id: string, updateDto: UpdateCustomFieldDto): Promise<{
        formatting: string | null;
        type: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        label: string;
        inputMode: string;
        validation: string | null;
    }>;
    delete(id: string): Promise<void>;
}
