import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [CardsModule, TagsModule],
})
export class AppModule {}
