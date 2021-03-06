import { schema as normalizrSchema } from 'normalizr';
import * as topic from './topic';

export const schema = new normalizrSchema.Entity('board', {});

export const schemaWithTopic = new normalizrSchema.Entity(
  'board',
  { items: [topic.schema] },
  { idAttribute: entity => entity.basic.id },
);

export const schemaWithSubBoard = new normalizrSchema.Entity(
  'board',
  { items: [schema] },
  { idAttribute: entity => entity.id || entity.basic.id },
);
export const schemasArray = new normalizrSchema.Array(schemaWithSubBoard);
