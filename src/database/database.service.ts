import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '@types-ts/core/env/env.type';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

@Injectable()
export class DatabaseService {
  public readonly db: NeonHttpDatabase;
  constructor(private readonly configService: ConfigService) {
    const sql = neon((configService.get('database') as Env['database']).url);
    this.db = drizzle(sql);
  }
}
