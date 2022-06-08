import { Module } from '@nestjs/common';
import { CardsModule } from './modules/cards/cards.module';

@Module({
  imports: [CardsModule],
})
export class AppModule {}
