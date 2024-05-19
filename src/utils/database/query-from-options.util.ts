import { DatabaseService } from '@database/database.service';
import { RepositoryOptions } from '@types-ts/database/repository-options.type';

export const queryFromOptions = (
  databaseService: DatabaseService,
  options?: RepositoryOptions,
) => options?.transaction ?? databaseService;
