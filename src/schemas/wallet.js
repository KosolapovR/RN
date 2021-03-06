import { schema as normalizrSchema } from 'normalizr';
import { schema as transaction } from './transaction';

export const schema = new normalizrSchema.Entity('wallet', {
  transactions: [transaction],
});
export const schemasArray = new normalizrSchema.Array(schema);
