import { schema as normalizrSchema } from 'normalizr';

export const schema = new normalizrSchema.Entity('FAQTopic', {});
export const schemasArray = new normalizrSchema.Array(schema);
