import { RawEnv } from '@types-ts/core/env/raw-env.type';

export const ENV = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  ENABLE_SWAGGER: process.env.ENABLE_SWAGGER,
  JWT_SECRET: process.env.JWT_SECRET,
} satisfies RawEnv;
