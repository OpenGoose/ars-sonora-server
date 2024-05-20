import { ENV } from '@constants/env/env.constant';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/models/schema-definition.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
});
