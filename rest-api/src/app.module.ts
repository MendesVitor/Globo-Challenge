import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './modules/cards/cards.module';
import { TagsModule } from './modules/tags/tags.module';
import { databaseConfig } from './shared/configs/database.config';

@Module({
    imports: [TypeOrmModule.forRoot(databaseConfig()), CardsModule, TagsModule],
})
export class AppModule {}
