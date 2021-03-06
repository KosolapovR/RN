import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('userMessage', {});
export const schemasArray = new normalizrSchema.Array(schema);
