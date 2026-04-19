import { ZodSchema } from "zod";

const validator = (form: unknown, schema: ZodSchema) => {
  const validated = schema.safeParse(form);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }
  return undefined;
};
export default validator;
