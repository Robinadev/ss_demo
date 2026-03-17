import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ClassificationService } from './services/classification.service';
import { ClassificationController } from './classification.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ClassificationController],
  providers: [ClassificationService],
  exports: [ClassificationService],
})
export class ClassificationModule {}
