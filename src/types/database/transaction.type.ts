import { DatabaseService } from '@database/database.service';

export type Transaction = Parameters<
  Parameters<DatabaseService['db']['transaction']>[0]
>[0];
