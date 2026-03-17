import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            id: string;
            createdAt: Date;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            language: string;
            id: string;
            status: import(".prisma/client").$Enums.UserStatus;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        };
        token: string;
    }>;
    getProfile(req: any): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        language: string;
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, dto: Partial<RegisterDto>): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        language: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    verifyToken(req: any): Promise<{
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        language: string;
        id: string;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map