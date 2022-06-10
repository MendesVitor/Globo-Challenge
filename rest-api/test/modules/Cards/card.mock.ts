import { randomUUID } from 'crypto';
import { Card } from 'src/modules/cards/entities/card.entity';
import { TagMock } from '../tags/tag.mock';

export const CardMock: Card = {
    id: randomUUID(),
    text: 'my card',
    created_at: new Date(),
    updated_at: new Date(),
    tags: [TagMock],
};
