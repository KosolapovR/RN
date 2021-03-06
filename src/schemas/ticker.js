import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('ticker', {}, { idAttribute: entity => `${entity.symbol}${entity.exchange}` });
export const schemasArray = new normalizrSchema.Array(schema);
