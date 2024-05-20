// src/migrate.ts

import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from 'dotenv';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { TABLES_DEFINITION } from '@database/models/tables-definition';

config({ path: '.env' });

const url = process.env.DATABASE_URL!;

const main = async () => {
  try {
    const pg = postgres(url);
    const db = drizzle(pg, { schema: TABLES_DEFINITION, logger: true });
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migration completed');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

main();
