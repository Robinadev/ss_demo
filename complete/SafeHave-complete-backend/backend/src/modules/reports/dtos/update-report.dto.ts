import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '@prisma/client';

export class UpdateReportDto {
  @ApiProperty({
    description: 'Update report status',
    enum: ReportStatus,
  })
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;
}
