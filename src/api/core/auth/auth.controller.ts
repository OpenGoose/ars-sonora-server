import { AuthService } from '@api/core/auth/auth.service';
import { LoginDTO } from '@dtos/core/auth/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return await this.authService.login(loginData);
  }
}
