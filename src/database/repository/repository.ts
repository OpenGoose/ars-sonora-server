import { DatabaseService } from '@database/database.service';
import { RepositoryOptions } from '@types-ts/database/repository-options.type';
import { queryFromOptions } from '@utils/database/query-from-options.util';
export abstract class Repository {
  constructor(private readonly databaseService: DatabaseService) {}

  protected query(options?: RepositoryOptions) {
    return queryFromOptions(this.databaseService, options);
  }
}
