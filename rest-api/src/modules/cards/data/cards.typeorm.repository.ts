import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { Card } from '../entities/card.entity';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsTypeormRepository implements CardsRepository {
    constructor(
        @InjectRepository(Card)
        private readonly repository: Repository<Card>,
    ) {}

    async create(createCardDto: CreateCardDto): Promise<Card> {
        return this.repository.save(createCardDto);
    }

    async findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    listByTag(id: string): Promise<Card[]> {
        return this.repository.find({ where: { tags: { id } } });
    }

    update(id: string, updateCardDto: UpdateCardDto) {
        this.repository.save({ id, ...updateCardDto });
    }

    async remove(id: string) {
        this.repository.delete(id);
    }
}
