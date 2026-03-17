import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './services/reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { IncidentCategory, ReportStatus, SeverityLevel } from '@prisma/client';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit an incident report' })
  async createReport(@Body() dto: CreateReportDto, @Request() req: any) {
    // Get user ID if authenticated, otherwise null (for anonymous reports)
    const userId = req.user?.id || null;
    const ipAddress = req.ip || req.connection.remoteAddress;

    return this.reportsService.createReport(
      {
        ...dto,
        ipAddress,
      },
      userId,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all reports with pagination' })
  async getAllReports(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: ReportStatus,
    @Query('category') category?: IncidentCategory,
    @Query('severity') severity?: SeverityLevel,
    @Query('flagged') flagged?: string,
  ) {
    return this.reportsService.getAllReports(page, limit, {
      status,
      category,
      severity,
      flagged: flagged === undefined ? undefined : flagged === 'true',
    });
  }

  @Get('high-risk')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get high-risk reports requiring review' })
  async getHighRiskReports(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.reportsService.getHighRiskReports(limit);
  }

  @Get('analytics')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get report analytics' })
  async getAnalytics(
    @Query('days', new DefaultValuePipe(30), ParseIntPipe) days: number,
  ) {
    return this.reportsService.getReportAnalytics(days);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get report details' })
  async getReport(@Param('id') id: string) {
    return this.reportsService.getReport(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update report status' })
  async updateReport(
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
    @Request() req: any,
  ) {
    return this.reportsService.updateReport(id, dto, req.user?.id);
  }

  @Post(':id/evidence')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add evidence file to report' })
  async addEvidence(
    @Param('id') reportId: string,
    @Body()
    body: {
      fileUrl: string;
      fileName: string;
      fileType: string;
      fileSize: number;
    },
  ) {
    return this.reportsService.addEvidence(
      reportId,
      body.fileUrl,
      body.fileName,
      body.fileType,
      body.fileSize,
    );
  }
}
