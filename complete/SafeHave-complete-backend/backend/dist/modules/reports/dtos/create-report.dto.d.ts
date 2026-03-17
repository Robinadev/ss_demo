import { IncidentCategory } from '@prisma/client';
export declare class CreateReportDto {
    title: string;
    description: string;
    category?: IncidentCategory;
    isAnonymous?: boolean;
    language?: string;
    location?: string;
    ipAddress?: string;
    deviceFingerprint?: string;
}
//# sourceMappingURL=create-report.dto.d.ts.map