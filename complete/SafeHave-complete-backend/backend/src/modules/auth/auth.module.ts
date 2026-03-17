import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService,],
  exports: [AuthService],
})
export class AuthModule {}
