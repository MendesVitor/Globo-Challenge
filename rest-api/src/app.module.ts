import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './modules/cards/cards.module';
import { TagsModule } from './modules/tags/tags.module';
import { databaseConfig } from './shared/configs/database.config';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        CardsModule,
        TagsModule,
    ],
})
export class AppModule {}
