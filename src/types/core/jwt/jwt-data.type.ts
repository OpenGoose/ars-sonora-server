import { uuid } from '@types-ts/core/uuid.type';

export interface JwtData {
  userId: uuid;
  login: string;
}
