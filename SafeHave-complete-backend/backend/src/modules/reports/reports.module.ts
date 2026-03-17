import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ClassificationModule } from '../classification/classification.module';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [PrismaModule, ClassificationModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
