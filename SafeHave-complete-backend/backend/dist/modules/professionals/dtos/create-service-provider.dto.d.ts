import { ServiceProviderType } from '@prisma/client';
export declare class CreateServiceProviderDto {
    name: string;
    type: ServiceProviderType;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    description?: string;
    website?: string;
    languages?: string[];
    specializations?: string[];
    availability?: string;
}
//# sourceMappingURL=create-service-provider.dto.d.ts.map