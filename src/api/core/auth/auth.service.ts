import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@repositories/core/user.repository';
import { JwtData } from '@types-ts/core/jwt/jwt-data.type';
import { compareHashWithSalt } from '@utils/cryptography/cryptography.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async login(loginData: { login: string; password: string }) {
    const user = await this.userRepository.findUserByLogin({
      login: loginData.login,
    });

    if (!user) throw new NotFoundException();

    if (!compareHashWithSalt(user.password, loginData.password))
      throw new NotFoundException(); // Not found for security reasons

    return {
      accessToken: await this.signJwt({ login: user.login, userId: user.id }),
    };
  }

  async signJwt(jwtData: JwtData) {
    return await this.jwtService.signAsync(jwtData);
  }
}
