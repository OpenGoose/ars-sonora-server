import { timestampsDBColumns } from '@database/models/common/timestamps.columns';
import { logsTable } from '@database/models/tables/logs.table';
import { foreignKey, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),

    // Info
    name: varchar('name', { length: 32 }).notNull(),
    secondName: varchar('second_name', { length: 32 }),
    lastName: varchar('last_name', { length: 32 }),

    // Auth
    login: varchar('login', { length: 16 }).notNull().unique(),
    password: varchar('password', { length: 256 }),

    // Contacting
    email: varchar('email', { length: 64 }).unique(),

    // Timestamps
    ...timestampsDBColumns,
  },
  // (table) => {
  //   return {
  //     parentReference: foreignKey({
  //       columns: [table.id],
  //       foreignColumns: [logsTable.userId],
  //     }),
  //   };
  // },
);
