import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @MaxLength(16)
  @MinLength(4)
  @IsNotEmpty()
  login: string;

  @IsString()
  @MaxLength(128)
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
