import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('logHistory', {});
export const schemaArray = new normalizrSchema.Array(schema);
