import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { CaseManagementService } from './services/case-management.service';
import { CasesController } from './cases.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CasesController],
  providers: [CaseManagementService],
  exports: [CaseManagementService],
})
export class CasesModule {}
