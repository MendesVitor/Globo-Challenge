import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TagsService } from '../tags/tags.service';
import { CardsRepository } from './data/cards.repository';
import { CardDto } from './dto/card.dto';
import { CardsRepositoryProvide } from './provide';

@Injectable()
export class CardsService {
    constructor(
        @Inject(CardsRepositoryProvide)
        private readonly repository: CardsRepository,
        private readonly tagService: TagsService,
    ) {}

    async create(cardDto: CardDto) {
        cardDto.tags = await this.tagService.findTagsById(cardDto.tagsId);

        return this.repository.create(cardDto);
    }

    findAll() {
        return this.repository.findAll();
    }

    listByTag(id: string) {
        return this.repository.listByTag(id);
    }

    findOne(id: string) {
        return this.cardCanBeFound(id);
    }

    async update(id: string, cardDto: CardDto) {
        await this.cardCanBeFound(id);
        cardDto.tags = await this.tagService.findTagsById(cardDto.tagsId);
        delete cardDto.tagsId;
        return this.repository.update(id, cardDto);
    }

    async remove(id: string) {
        await this.cardCanBeFound(id);
        return this.repository.remove(id);
    }

    private async cardCanBeFound(id: string) {
        const card = await this.repository.findOne(id);
        if (!card) {
            throw new NotFoundException('Card not found');
        }

        return card;
    }
}
