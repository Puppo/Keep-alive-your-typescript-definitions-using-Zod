import { ZodTypeAny, z } from 'zod';
import { validate } from '../zod/validation';

const withZodValidation =
  <Schema extends ZodTypeAny, P extends z.infer<Schema>>(schema: Schema) =>
    (Component: React.ComponentType<P>): React.FC<P> =>
      function ComponentWithValidation(props: P) {
        const realProps = validate(props, schema)

        return <Component {...realProps} />;
      };

export default withZodValidation
