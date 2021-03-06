import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('session', {});
export const schemasArray = new normalizrSchema.Array(schema);
