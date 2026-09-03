import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    getProfile(userId: string): Promise<{
        email: string;
        id: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
}
