import { CardDto } from '../dto/card.dto';
import { Card } from '../entities/card.entity';

export interface CardsRepository {
    create(cardDto: CardDto): Promise<Card>;
    findAll(): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    update(id: string, cardDto: CardDto): void;
    remove(id: string): void;
    listByTag(id: string): Promise<Card[]>;
}
