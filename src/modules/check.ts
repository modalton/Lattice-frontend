import * as t from 'io-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';

export default <A, O>(request: unknown, type: t.Type<A, O>): A =>
  pipe(
    type.decode(request),
    fold(
      (errors: t.Errors) => {
        throw new Error(
          errors.map(error => error.context.map(({ key }) => key).join(' ')).join(', ')
        );
      },
      i => i
    )
  );
