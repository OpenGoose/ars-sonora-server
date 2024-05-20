import { TABLES_DEFINITION } from '@database/models/tables-definition';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@types-ts/core/env/env.type';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public readonly db: PostgresJsDatabase<typeof TABLES_DEFINITION>;
  constructor(readonly configService: ConfigService) {
    const pg = postgres((configService.get('database') as Env['database']).url);
    this.db = drizzle(pg, { schema: TABLES_DEFINITION, logger: true });
  }

  async onModuleInit() {
    return;
    try {
      await migrate(this.db, { migrationsFolder: './drizzle' });
    } catch (e) {
      Logger.error(e);
    }
  }
}
