import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { TagsService } from '../tags/tags.service';
import { CardsRepository } from './data/cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepositoryProvide } from './provide';

@Injectable()
export class CardsService {
    constructor(
        @Inject(CardsRepositoryProvide)
        private readonly repository: CardsRepository,
        private readonly tagService: TagsService,
    ) {}

    async create(createCardDto: CreateCardDto) {
        createCardDto.tags = await this.tagService.findTagsById(
            createCardDto.tagsId,
        );

        return this.repository.create(createCardDto);
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

    async update(id: string, updateCardDto: UpdateCardDto) {
        await this.cardCanBeFound(id);
        updateCardDto.tags = await this.tagService.findTagsById(
            updateCardDto.tagsId,
        );
        delete updateCardDto.tagsId;
        return this.repository.update(id, updateCardDto);
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
