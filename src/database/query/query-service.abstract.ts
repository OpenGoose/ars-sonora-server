import { Prisma } from '@prisma/client';
import { format } from 'date-fns';

type Options<F extends string> = {
  fields: F[];
};

export abstract class QueryService<F extends string> {
  protected constructor(private readonly options: Options<F>) {}

  // Parts generators
  protected getAllFields(opts: { alias?: string } = {}) {
    return Prisma.raw(
      this.options.fields
        .map((field) => `${opts.alias ? `[${opts.alias}].` : ''}[${field}]`)
        .join(','),
    );
  }

  public static formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }
}
