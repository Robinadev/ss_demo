import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CaseManagementService } from './services/case-management.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCaseAssignmentDto } from './dtos/create-case-assignment.dto';
import { AssignmentStatus } from '@prisma/client';

@ApiTags('cases')
@Controller('cases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CasesController {
  constructor(private caseService: CaseManagementService) {}

  @Post('auto-route/:reportId')
  @ApiOperation({
    summary: 'Automatically route case to appropriate professional',
  })
  async autoRouteCase(@Param('reportId') reportId: string) {
    return this.caseService.autoRouteCase(reportId);
  }

  @Post('assign/:reportId')
  @ApiOperation({ summary: 'Manually assign case to a professional' })
  async assignCase(
    @Param('reportId') reportId: string,
    @Body() dto: CreateCaseAssignmentDto,
    @Request() req: any,
  ) {
    return this.caseService.assignCase(reportId, dto, req.user.id);
  }

  @Get('professional/:professionalId')
  @ApiOperation({
    summary: 'Get all cases assigned to a professional',
  })
  async getCasesForProfessional(
    @Param('professionalId') professionalId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.caseService.getCasesForProfessional(professionalId, page, limit);
  }

  @Put(':caseId/status')
  @ApiOperation({ summary: 'Update case status' })
  async updateCaseStatus(
    @Param('caseId') caseId: string,
    @Body() body: { status: AssignmentStatus; feedback?: string },
  ) {
    return this.caseService.updateCaseStatus(caseId, body.status, body.feedback);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get case statistics' })
  async getCaseStats() {
    return this.caseService.getCaseStats();
  }
}
