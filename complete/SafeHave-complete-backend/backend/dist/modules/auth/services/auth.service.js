"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    /**
     * Register new user
     */
    async register(dto) {
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered');
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        // Create user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName || null,
                lastName: dto.lastName || null,
                phone: dto.phone || null,
                role: dto.role || 'SURVIVOR',
                language: dto.language || 'en',
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
        this.logger.log(`User registered: ${user.email}`);
        // Generate JWT token
        const token = this.generateToken(user);
        return {
            user,
            token,
        };
    }
    /**
     * Login user
     */
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(dto.password, user.password || '');
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Check if user is active
        if (user.status !== 'ACTIVE') {
            throw new common_1.UnauthorizedException('User account is not active');
        }
        this.logger.log(`User logged in: ${user.email}`);
        const token = this.generateToken(user);
        const { password: _password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    /**
     * Verify JWT token and return user
     */
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });
            if (!user || user.status !== 'ACTIVE') {
                throw new common_1.UnauthorizedException('User not found or inactive');
            }
            const { password: _password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    /**
     * Get user profile
     */
    async getUserProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                language: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return user;
    }
    /**
     * Update user profile
     */
    async updateUserProfile(userId, dto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.firstName && { firstName: dto.firstName }),
                ...(dto.lastName && { lastName: dto.lastName }),
                ...(dto.phone && { phone: dto.phone }),
                ...(dto.language && { language: dto.language }),
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                language: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    /**
     * Change password
     */
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        // Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password || '');
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        this.logger.log(`Password changed for user: ${user.email}`);
        return { message: 'Password changed successfully' };
    }
    /**
     * Generate JWT token
     */
    generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map