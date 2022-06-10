import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { Card } from '../entities/card.entity';

export interface CardsRepository {
    create(createCardDto: CreateCardDto): Promise<Card>;
    findAll(): Promise<Card[]>;
    findOne(id: string): Promise<Card>;
    update(id: string, updateCardDto: UpdateCardDto): void;
    remove(id: string): void;
    listByTag(id: string): Promise<Card[]>;
}
