import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('course', {}, { idAttribute: entity => entity.sellCurrency });
export const schemasArray = new normalizrSchema.Array(schema);
