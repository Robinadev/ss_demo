import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    /**
     * Register new user
     */
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
    /**
     * Login user
     */
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
    /**
     * Verify JWT token and return user
     */
    validateToken(token: string): Promise<{
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
    /**
     * Get user profile
     */
    getUserProfile(userId: string): Promise<{
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
    /**
     * Update user profile
     */
    updateUserProfile(userId: string, dto: Partial<RegisterDto>): Promise<{
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
    /**
     * Change password
     */
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    /**
     * Generate JWT token
     */
    private generateToken;
}
//# sourceMappingURL=auth.service.d.ts.map