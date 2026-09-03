import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
        createdAt: Date;
    }[]>;
    findById(id: string): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
