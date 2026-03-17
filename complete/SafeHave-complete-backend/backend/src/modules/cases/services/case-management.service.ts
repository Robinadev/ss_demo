import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import {
  CaseType,
  CasePriority,
  AssignmentStatus,
  ServiceProviderType,
} from '@prisma/client';
import { CreateCaseAssignmentDto } from '../dtos/create-case-assignment.dto';

@Injectable()
export class CaseManagementService {
  private readonly logger = new Logger(CaseManagementService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Automatically route case to appropriate professional based on classification
   */
  async autoRouteCase(reportId: string): Promise<any> {
    this.logger.log(`Auto-routing case for report: ${reportId}`);

    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
      include: {
        caseAssignment: true,
      },
    });

    if (!report) {
      throw new BadRequestException('Report not found');
    }

    if (report.caseAssignment) {
      this.logger.warn(`Case already assigned for report: ${reportId}`);
      return report.caseAssignment;
    }

    // Determine required service provider types based on case type
    const serviceProviderTypes = this.mapCaseTypeToProviders(
      report.suggestedCaseType as CaseType,
    );

    // Find available professionals
    const availableProfessionals = await this.findAvailableProfessionals(
      serviceProviderTypes,
      report.location ?? undefined,
    );

    if (availableProfessionals.length === 0) {
      this.logger.warn(
        `No available professionals for case: ${reportId}`,
      );
      return {
        error: 'No available professionals',
        message: 'Case will be reviewed manually',
      };
    }

    // Select primary professional (highest rated, most relevant)
    const primaryProfessional = this.selectBestProfessional(
      availableProfessionals,
      report.severity,
    );

    // Create case assignment
    const caseAssignment = await this.prisma.caseAssignment.create({
      data: {
        reportId,
        assignedToId: primaryProfessional.id,
        caseType: report.suggestedCaseType as CaseType,
        priority: this.mapSeverityToPriority(report.severity),
        dueDate: this.calculateDueDate(report.severity),
        notes: `Auto-routed case: ${report.category}. ${report.severity} severity. Suggested support: ${report.suggestedCaseType}`,
        status: AssignmentStatus.ACTIVE,
      },
      include: {
        assignedTo: true,
        supportProviders: true,
      },
    });

    // Link other relevant service providers
    const otherProviders = availableProfessionals
      .filter((p) => p.id !== primaryProfessional.id)
      .slice(0, 2); // Add up to 2 more providers

    for (const provider of otherProviders) {
      await this.prisma.caseAssignment.update({
        where: { id: caseAssignment.id },
        data: {
          supportProviders: {
            connect: { id: provider.id },
          },
        },
      });
    }

    this.logger.log(
      `Case auto-routed to ${primaryProfessional.name} (ID: ${primaryProfessional.id})`,
    );

    return caseAssignment;
  }

  /**
   * Manually assign case to specific professional
   */
  async assignCase(
    reportId: string,
    dto: CreateCaseAssignmentDto,
    adminId: string,
  ): Promise<any> {
    this.logger.log(
      `Manual case assignment by admin ${adminId} for report ${reportId}`,
    );

    const [report, professional] = await Promise.all([
      this.prisma.report.findUnique({ where: { id: reportId } }),
      this.prisma.serviceProvider.findUnique({
        where: { id: dto.assignedToId },
      }),
    ]);

    if (!report) {
      throw new BadRequestException('Report not found');
    }

    if (!professional) {
      throw new BadRequestException('Professional not found');
    }

    // Delete existing assignment if present
    const existing = await this.prisma.caseAssignment.findUnique({
      where: { reportId },
    });

    if (existing) {
      await this.prisma.caseAssignment.delete({ where: { id: existing.id } });
    }

    // Create new assignment
    const caseAssignment = await this.prisma.caseAssignment.create({
      data: {
        reportId,
        assignedToId: dto.assignedToId,
        assignedById: adminId,
        caseType: dto.caseType,
        priority: dto.priority || CasePriority.MEDIUM,
        notes: dto.notes,
        status: AssignmentStatus.ACTIVE,
      },
      include: {
        assignedTo: true,
      },
    });

    // Update report status
    await this.prisma.report.update({
      where: { id: reportId },
      data: {
        status: 'ASSIGNED_TO_PROFESSIONAL',
      },
    });

    this.logger.log(
      `Case manually assigned to ${professional.name}`,
    );

    return caseAssignment;
  }

  /**
   * Get all cases for a professional
   */
  async getCasesForProfessional(
    professionalId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const [cases, total] = await Promise.all([
      this.prisma.caseAssignment.findMany({
        where: {
          assignedToId: professionalId,
          status: AssignmentStatus.ACTIVE,
        },
        include: {
          report: {
            include: {
              reporter: true,
              caseComments: true,
            },
          },
          assignedTo: true,
          feedbacks: true,
        },
        orderBy: {
          priority: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.caseAssignment.count({
        where: {
          assignedToId: professionalId,
          status: AssignmentStatus.ACTIVE,
        },
      }),
    ]);

    return {
      data: cases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update case status
   */
  async updateCaseStatus(
    caseId: string,
    newStatus: AssignmentStatus,
    _feedback?: string,
  ) {
    const caseAssignment = await this.prisma.caseAssignment.update({
      where: { id: caseId },
      data: {
        status: newStatus,
        completedAt:
          newStatus === AssignmentStatus.COMPLETED ? new Date() : null,
      },
      include: {
        report: true,
      },
    });

    // Update report status if case completed
    if (newStatus === AssignmentStatus.COMPLETED) {
      await this.prisma.report.update({
        where: { id: caseAssignment.reportId },
        data: {
          status: 'RESOLVED',
          resolvedAt: new Date(),
        },
      });
    }

    return caseAssignment;
  }

  /**
   * Find available professionals by type and location
   */
  private async findAvailableProfessionals(
    providerTypes: ServiceProviderType[],
    _location?: string,
  ): Promise<any[]> {
    const professionals = await this.prisma.serviceProvider.findMany({
      where: {
        type: { in: providerTypes },
        isVerified: true,
        AND: [
          {
            OR: [
              { availability: { contains: 'available' } },
              { availability: { contains: 'open' } },
            ],
          },
        ],
      },
      include: {
        reviews: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });

    return professionals;
  }

  /**
   * Select best professional based on rating, experience, and case severity
   */
  private selectBestProfessional(professionals: any[], severity: string): any {
    // Weight selection based on severity and ratings
    let bestScore = -1;
    let selected = professionals[0];

    for (const professional of professionals) {
      let score = professional.rating || 0;

      // Critical cases: prioritize high-rated specialists
      if (severity === 'CRITICAL') {
        score = (professional.rating || 0) * 2;
      }

      // Check if professional has relevant specialization
      if (
        professional.specializations &&
        professional.specializations.length > 0
      ) {
        score += 1;
      }

      if (score > bestScore) {
        bestScore = score;
        selected = professional;
      }
    }

    return selected;
  }

  /**
   * Map case type to required service provider types
   */
  private mapCaseTypeToProviders(caseType: CaseType): ServiceProviderType[] {
    const mapping = {
      [CaseType.COUNSELING]: [ServiceProviderType.COUNSELOR],
      [CaseType.MEDICAL_SUPPORT]: [ServiceProviderType.MEDICAL_PROFESSIONAL],
      [CaseType.LEGAL_ASSISTANCE]: [ServiceProviderType.LEGAL_ADVISOR],
      [CaseType.EMERGENCY_SUPPORT]: [
        ServiceProviderType.NGO,
        ServiceProviderType.GOVERNMENT_AGENCY,
      ],
      [CaseType.PREVENTION_EDUCATION]: [ServiceProviderType.NGO],
      [CaseType.RESOURCE_REFERRAL]: [ServiceProviderType.HOTLINE],
      [CaseType.COMBINED_SUPPORT]: [
        ServiceProviderType.COUNSELOR,
        ServiceProviderType.MEDICAL_PROFESSIONAL,
        ServiceProviderType.LEGAL_ADVISOR,
      ],
    };

    return mapping[caseType] || [ServiceProviderType.NGO];
  }

  /**
   * Map severity to case priority
   */
  private mapSeverityToPriority(severity: string): CasePriority {
    const mapping: Record<string, CasePriority> = {
      CRITICAL: CasePriority.CRITICAL,
      HIGH: CasePriority.HIGH,
      MEDIUM: CasePriority.MEDIUM,
      LOW: CasePriority.LOW,
    };

    return mapping[severity] || CasePriority.MEDIUM;
  }

  /**
   * Calculate due date based on severity
   */
  private calculateDueDate(severity: string): Date {
    const date = new Date();

    switch (severity) {
      case 'CRITICAL':
        date.setDate(date.getDate() + 1); // 1 day
        break;
      case 'HIGH':
        date.setDate(date.getDate() + 3); // 3 days
        break;
      case 'MEDIUM':
        date.setDate(date.getDate() + 7); // 7 days
        break;
      default:
        date.setDate(date.getDate() + 14); // 14 days
    }

    return date;
  }

  /**
   * Get case statistics
   */
  async getCaseStats() {
    const stats = await this.prisma.caseAssignment.groupBy({
      by: ['caseType', 'priority', 'status'],
      _count: true,
    });

    return {
      byType: stats,
      averageResolutionDays: 7, // Placeholder
    };
  }
}
