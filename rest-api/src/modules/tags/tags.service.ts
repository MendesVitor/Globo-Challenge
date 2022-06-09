import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { TagsRepository } from './data/tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepositoryProvide } from './provide';

@Injectable()
export class TagsService {
    constructor(
        @Inject(TagRepositoryProvide)
        private readonly repository: TagsRepository,
    ) {}

    async create(createTagDto: CreateTagDto) {
        await this.verifyIfTagExists(createTagDto.name);
        return this.repository.create(createTagDto);
    }

    findAll() {
        return this.repository.findAll();
    }

    async findOne(id: string) {
        return await this.getTagById(id);
    }

    async update(id: string, updateTagDto: UpdateTagDto) {
        await this.verifyIfTagExists(updateTagDto.name);
        await this.getTagById(id);
        return this.repository.update(id, updateTagDto);
    }

    async remove(id: string) {
        await this.getTagById(id);
        return this.repository.remove(id);
    }

    private async getTagById(id: string) {
        const tag = await this.repository.findOne(id);
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }

        return tag;
    }

    private async verifyIfTagExists(name: string) {
        if (await this.repository.findByName(name)) {
            throw new ConflictException('Tag already exists');
        }
    }
}
