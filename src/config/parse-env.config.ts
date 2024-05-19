import { ENV } from '@constants/env/env.constant';
import { Env } from '@types-ts/core/env/env.type';

export const parseEnv = () => {
  return {
    port: +ENV.SERVER_PORT,
    database: {
      url: ENV.DATABASE_URL,
    },
    swagger: {
      enabled: ENV.ENABLE_SWAGGER === 'true',
    },
    jwt: {
      secret: ENV.JWT_SECRET,
    },
  } satisfies Env;
};
