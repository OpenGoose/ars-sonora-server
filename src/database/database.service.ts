import { usersTable } from '@database/models/tables/users.table';
import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@types-ts/core/env/env.type';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

export const TABLES_DEFINITION = { users: usersTable };

@Injectable()
export class DatabaseService {
  public readonly db: NeonHttpDatabase<typeof TABLES_DEFINITION>;
  constructor(readonly configService: ConfigService) {
    const sql = neon((configService.get('database') as Env['database']).url);
    this.db = drizzle(sql, { schema: TABLES_DEFINITION, logger: true });
  }
}
