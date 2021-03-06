import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('accountPaymentSystem', {});
export const schemasArray = new normalizrSchema.Array(schema);
