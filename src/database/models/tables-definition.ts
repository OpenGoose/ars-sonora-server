import { logsTable } from '@database/models/tables/logs.table';
import { usersTable } from '@database/models/tables/users.table';

export const TABLES_DEFINITION = { users: usersTable, logs: logsTable };
