import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { TagsRepository } from './data/tags.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepositoryProvide } from './provide';

@Injectable()
export class TagsService {
    constructor(
        @Inject(TagsRepositoryProvide)
        private readonly repository: TagsRepository,
    ) {}

    async create(createTagDto: CreateTagDto) {
        await this.TagAlreadyExists(createTagDto.name);
        return this.repository.create(createTagDto);
    }

    findAll() {
        return this.repository.findAll();
    }

    async findOne(id: string) {
        return await this.tagCanBeFound(id);
    }

    async findTagsById(ids: string[]) {
        return this.repository.findTagsById(ids);
    }

    async update(id: string, updateTagDto: UpdateTagDto) {
        await this.TagAlreadyExists(updateTagDto.name);
        await this.tagCanBeFound(id);
        return this.repository.update(id, updateTagDto);
    }

    async remove(id: string) {
        await this.tagCanBeFound(id);
        return this.repository.remove(id);
    }

    private async tagCanBeFound(id: string) {
        const tag = await this.repository.findOne(id);
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }

        return tag;
    }

    private async TagAlreadyExists(name: string) {
        if (await this.repository.findByName(name)) {
            throw new ConflictException('Tag already exists');
        }
    }
}
