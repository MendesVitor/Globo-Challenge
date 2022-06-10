import { randomUUID } from 'crypto';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export const TagMock: Tag = {
    id: randomUUID(),
    name: 'test',
};
