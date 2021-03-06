import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('marketSubscription', {});
export const schemasArray = new normalizrSchema.Array(schema);
