import { DatabaseService } from '@database/database.service';
import { Sql } from '@prisma/client/runtime/library';
import { RepositoryOptions } from '@types-ts/database/repository-options.type';
import { Transaction } from '@types-ts/database/transaction.type';
import { queryFromOptions } from '@utils/database/query-from-options.util';

type PaginatedResponseFactoryOptions<T extends object> = {
  rowsFn: () => Promise<T[]>;
  countFn: () => Promise<{ count: number }[]>;
};

type GeneratePaginatedResponseOptions = {
  rowsQuery: Sql;
  countQuery: Sql;
  transaction?: Transaction;
};

export abstract class Repository {
  constructor(private readonly databaseService: DatabaseService) {}

  protected query(options?: RepositoryOptions) {
    return queryFromOptions(this.databaseService, options);
  }

  protected async useOrCreateTransaction<T>(
    fn: (transaction: Transaction) => Promise<T>,
    options?: RepositoryOptions,
  ) {
    if (options?.transaction) return await fn(options?.transaction);
    return await this.databaseService.$transaction(async (tr) => {
      return await fn(tr);
    });
  }

  protected async paginatedResponseFactory<T extends object>({
    rowsFn,
    countFn,
  }: PaginatedResponseFactoryOptions<T>) {
    const [rows, count] = await Promise.all([rowsFn(), countFn()]);

    return {
      rows,
      count: count[0].count,
    };
  }

  protected async generatePaginatedResponse<T extends object>({
    rowsQuery,
    countQuery,
    transaction,
  }: GeneratePaginatedResponseOptions) {
    return await this.useOrCreateTransaction(
      async (transaction) =>
        await this.paginatedResponseFactory({
          rowsFn: async () => await transaction.$queryRaw<T[]>(rowsQuery),
          countFn: async () =>
            await transaction.$queryRaw<{ count: number }[]>(countQuery),
        }),
      { transaction },
    );
  }
}
