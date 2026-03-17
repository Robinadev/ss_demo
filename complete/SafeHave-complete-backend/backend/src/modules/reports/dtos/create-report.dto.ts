import { IsString, IsBoolean, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IncidentCategory } from '@prisma/client';

export class CreateReportDto {
  @ApiProperty({
    description: 'Report title',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title!: string;

  @ApiProperty({
    description: 'Detailed description of the incident',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description!: string;

  @ApiProperty({
    description: 'Incident category',
    enum: IncidentCategory,
  })
  @IsEnum(IncidentCategory)
  category?: IncidentCategory;

  @ApiProperty({
    description: 'Is the report anonymous',
    default: true,
  })
  @IsBoolean()
  isAnonymous?: boolean = true;

  @ApiProperty({
    description: 'Language of the report (en, am)',
    default: 'en',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Location of the incident',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'IP address (automatically captured)',
    required: false,
  })
  @IsOptional()
  @IsString()
  ipAddress?: string;

  @ApiProperty({
    description: 'Device fingerprint for fraud detection',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceFingerprint?: string;
}
