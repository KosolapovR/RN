import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('cryptoStat', {}, { idAttribute: entity => entity.ticker });
export const schemasArray = new normalizrSchema.Array(schema);
