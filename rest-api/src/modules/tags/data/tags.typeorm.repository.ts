import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagDto } from '../dto/tag.dto';
import { Tag } from '../entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsTypeormRepository implements TagsRepository {
    constructor(
        @InjectRepository(Tag)
        private readonly repository: Repository<Tag>,
    ) {}

    async create(tagDto: TagDto) {
        return this.repository.save(tagDto);
    }

    async findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    update(id: string, tagDto: TagDto) {
        this.repository.update(id, tagDto);
    }

    async remove(id: string) {
        this.repository.delete(id);
    }

    findTagsById(ids: string[]) {
        return this.repository.find({ where: { id: In(ids) } });
    }

    findByName(name: string) {
        return this.repository.findOne({ where: { name } });
    }
}
