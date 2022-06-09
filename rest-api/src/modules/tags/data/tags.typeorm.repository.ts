import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsTypeormRepository implements TagsRepository {
    constructor(
        @InjectRepository(Tag)
        private readonly repository: Repository<Tag>,
    ) {}
    findByName(name: string): Promise<Tag> {
        return this.repository.findOne({ where: { name } });
    }

    async create(createTagDto: CreateTagDto) {
        return this.repository.save(createTagDto);
    }

    async findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    update(id: string, updateTagDto: UpdateTagDto) {
        this.repository.update(id, updateTagDto);
    }

    async remove(id: string) {
        this.repository.delete(id);
    }
}
