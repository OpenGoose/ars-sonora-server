import { format } from 'date-fns';

type Options<F extends string> = {
  fields: F[];
};

export abstract class QueryService<F extends string> {
  protected constructor(private readonly options: Options<F>) {}

  public static formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
  }
}
