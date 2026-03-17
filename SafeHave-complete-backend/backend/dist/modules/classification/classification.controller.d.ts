import { ClassificationService } from './services/classification.service';
import { CreateClassificationDto } from './dtos/create-classification.dto';
export declare class ClassificationController {
    private classificationService;
    constructor(classificationService: ClassificationService);
    analyzeReport(dto: CreateClassificationDto): Promise<{
        classification: import("./services/classification.service").ClassificationResult;
        riskScore: import("./services/classification.service").RiskScoreResult;
        recommendation: {
            shouldReview: boolean;
            priority: string;
            requiresManualReview: boolean;
        };
    }>;
    getStats(): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ReportGroupByOutputType, ("category" | "severity")[]> & {
        _count: number;
    })[]>;
    private determinePriority;
}
//# sourceMappingURL=classification.controller.d.ts.map