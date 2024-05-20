import { pgEnum } from 'drizzle-orm/pg-core';

export enum LogType {
  LOGIN = 'login',
}

export const logTypeDBEnum = pgEnum('log_type', [LogType.LOGIN]);
