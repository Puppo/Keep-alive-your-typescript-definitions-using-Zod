import { TypeOf, ZodType, ZodTypeDef } from 'zod';

export class ValidationError extends Error {}

export function validate<
  Schema extends ZodType<Output, Def, Input>,
  Output,
  Def extends ZodTypeDef,
  Input
>(data: unknown, schema: Schema): TypeOf<Schema> {
  const parseResult = schema.safeParse(data);
  if (!parseResult.success) {
    throw new ValidationError(
      parseResult.error.errors.map(({ message }) => message).join('\n')
    );
  }
  return parseResult.data;
}
