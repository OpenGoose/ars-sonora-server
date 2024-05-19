import { AuthModule } from '@api/core/auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
})
export class ApiModule {}
