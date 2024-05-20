import { TABLES_DEFINITION } from '@database/models/tables-definition';
import { Pool } from '@neondatabase/serverless';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@types-ts/core/env/env.type';
import { drizzle, NeonDatabase } from 'drizzle-orm/neon-serverless';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public readonly db: NeonDatabase<typeof TABLES_DEFINITION>;
  constructor(readonly configService: ConfigService) {
    const pool = new Pool({
      connectionString: (configService.get('database') as Env['database']).url,
    });
    this.db = drizzle(pool, { schema: TABLES_DEFINITION, logger: true });
  }

  async onModuleInit() {
    // Migrate
  }
}
