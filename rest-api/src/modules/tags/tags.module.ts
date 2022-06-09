import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsTypeormRepository } from './data/tags.typeorm.repository';
import { Tag } from './entities/tag.entity';
import { TagRepositoryProvide } from './provide';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    controllers: [TagsController],
    providers: [
        {
            provide: TagRepositoryProvide,
            useClass: TagsTypeormRepository,
        },
        TagsService,
    ],
})
export class TagsModule {}
