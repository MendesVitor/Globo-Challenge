import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsTypeormRepository } from './data/tags.typeorm.repository';
import { Tag } from './entities/tag.entity';
import { TagsRepositoryProvide } from './provide';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    controllers: [TagsController],
    providers: [
        {
            provide: TagsRepositoryProvide,
            useClass: TagsTypeormRepository,
        },
        TagsService,
    ],
    exports: [TagsService],
})
export class TagsModule {}
