import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardsTypeormRepository } from './data/cards.typeorm.repository';
import { CardsRepositoryProvide } from './provide';
import { TagsModule } from '../tags/tags.module';

@Module({
    imports: [TypeOrmModule.forFeature([Card]), TagsModule],
    controllers: [CardsController],
    providers: [
        {
            provide: CardsRepositoryProvide,
            useClass: CardsTypeormRepository,
        },
        CardsService,
    ],
})
export class CardsModule {}
