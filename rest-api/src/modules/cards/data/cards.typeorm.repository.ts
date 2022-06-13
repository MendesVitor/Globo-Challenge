import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardDto } from '../dto/card.dto';

import { Card } from '../entities/card.entity';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsTypeormRepository implements CardsRepository {
    constructor(
        @InjectRepository(Card)
        private readonly repository: Repository<Card>,
    ) {}

    async create(cardDto: CardDto): Promise<Card> {
        return this.repository.save(cardDto);
    }

    async findAll() {
        return this.repository.find({ order: { created_at: 'ASC' } });
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    listByTag(id: string): Promise<Card[]> {
        return this.repository.find({
            where: { tags: { id } },
            order: { created_at: 'ASC' },
        });
    }

    update(id: string, cardDto: CardDto) {
        this.repository.save({ id, ...cardDto });
    }

    async remove(id: string) {
        this.repository.delete(id);
    }
}
