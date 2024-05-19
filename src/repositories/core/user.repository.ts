import { DatabaseService } from '@database/database.service';
import { Repository } from '@database/repository/repository';
import { Injectable } from '@nestjs/common';
import { RepositoryOptions } from '@types-ts/database/repository-options.type';

@Injectable()
export class UserRepository extends Repository {
  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  async findUserByLogin(
    { login }: { login: string },
    options?: RepositoryOptions,
  ) {
    return await this.query(options).user.findUnique({
      where: {
        login,
      },
    });
  }
}
