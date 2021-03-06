import { schema as normalizrSchema } from 'normalizr';
import { schema as topicMessage } from './topicMessage';

export const schema = new normalizrSchema.Entity('topic', {
  messages: [topicMessage],
}, { idAttribute: entity => entity.id || entity.topicId || entity.basic.boardId });
export const schemasArray = new normalizrSchema.Array(schema);

export const schemaWithMessages = new normalizrSchema.Entity('topic', {
  messages: [topicMessage],
}, { idAttribute: entity => entity.basic.id });
