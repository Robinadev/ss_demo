import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    description: 'Email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    description: 'First name',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'Last name',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'Phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: 'SURVIVOR',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'Preferred language (en, am)',
    default: 'en',
  })
  @IsOptional()
  @IsString()
  language?: string;
}
