import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('userInfo', {}, {
  idAttribute: entity => entity.userId,
});
export const schemasArray = new normalizrSchema.Array(schema);
