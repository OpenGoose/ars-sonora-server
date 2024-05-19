import { AuthController } from '@api/core/auth/auth.controller';
import { AuthService } from '@api/core/auth/auth.service';
import { Module } from '@nestjs/common';
import { UserRepository } from '@repositories/core/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
