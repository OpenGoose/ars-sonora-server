import { timestampsDBColumns } from '@database/models/common/timestamps.columns';
import { usersTable } from '@database/models/tables/users.table';
import { serial, pgTable, varchar, uuid } from 'drizzle-orm/pg-core';

export const logsTable = pgTable('logs', {
  id: serial('id').primaryKey(),

  // Info
  address: varchar('address', { length: 128 }),

  // Timestamps
  createdAt: timestampsDBColumns.createdAt,

  // Associations
  userId: uuid('user_id').references(() => usersTable.id),
});
