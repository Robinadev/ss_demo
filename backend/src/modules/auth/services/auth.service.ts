import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, firstName, lastName, roleId } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prismaService.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        roleId,
        isEmailVerified: false,
      },
      include: { role: true },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role.name);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
      tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role.name);

    // Save refresh token hash
    const refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.prismaService.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
      tokens,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // Check if refresh token exists and is valid
      const storedToken = await this.prismaService.refreshToken.findFirst({
        where: {
          userId: payload.sub,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token has expired or is invalid');
      }

      // Verify token hash
      const isTokenValid = await bcrypt.compare(refreshToken, storedToken.tokenHash);

      if (!isTokenValid) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      // Get user for role
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        include: { role: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      const newTokens = await this.generateTokens(user.id, user.email, user.role.name);

      // Delete old refresh token and create new one
      await this.prismaService.refreshToken.delete({
        where: { id: storedToken.id },
      });

      const newRefreshTokenHash = await bcrypt.hash(newTokens.refreshToken, 10);
      await this.prismaService.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: newRefreshTokenHash,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { tokens: newTokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string, refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      await this.prismaService.refreshToken.deleteMany({
        where: {
          userId,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      {
        sub: userId,
        email,
        role,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION') || '15m',
    };
  }

  async validateUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
