import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
        createdAt: Date;
    }[]>;
}
