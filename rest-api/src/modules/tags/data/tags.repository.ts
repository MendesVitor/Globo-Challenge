import { TagDto } from '../dto/tag.dto';
import { Tag } from '../entities/tag.entity';

export interface TagsRepository {
    create(tagDto: TagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: string): Promise<Tag>;
    update(id: string, tagDto: TagDto): void;
    remove(id: string): void;
    findByName(name: string): Promise<Tag>;
    findTagsById(ids: string[]): Promise<Tag[]>;
}
