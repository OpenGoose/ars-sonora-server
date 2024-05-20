import { timestampsDBColumns } from '@database/models/common/timestamps.columns';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
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
});
