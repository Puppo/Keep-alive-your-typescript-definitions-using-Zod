import { useParams } from 'react-router-dom';
import { ZodType, ZodTypeDef, z } from 'zod';
import { validate } from '../zod/validation';

const useParamsTypeSafe = <
  Schema extends ZodType<Output, Def, Input>,
  Output,
  Def extends ZodTypeDef,
  Input
>(schema: Schema): z.infer<Schema> => {
  const params = useParams();
  return validate(params, schema)
};

export default useParamsTypeSafe