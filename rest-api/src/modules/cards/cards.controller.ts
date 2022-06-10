import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';

@Controller('cards')
@ApiTags('Card')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Post()
    @ApiOperation({
        summary: 'Create a card',
    })
    @ApiCreatedResponse({ description: 'Create a card successfully' })
    create(@Body() cardDto: CardDto) {
        return this.cardsService.create(cardDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all cards',
    })
    @ApiCreatedResponse({ description: 'Create a card successfully' })
    findAll() {
        return this.cardsService.findAll();
    }

    @Get('by-tag')
    @ApiOperation({
        summary: 'Get all cards by tag',
    })
    @ApiCreatedResponse({
        description: 'Get all cards by tagCreate a card successfully',
    })
    @ApiQuery({ name: 'id', type: String })
    listByTag(@Query('id') id) {
        return this.cardsService.listByTag(id);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Find a card',
    })
    @ApiCreatedResponse({ description: 'Find a card successfully' })
    @ApiNotFoundResponse({ description: 'Card not found' })
    findOne(@Param('id') id: string) {
        return this.cardsService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Update a card',
    })
    @ApiCreatedResponse({ description: 'Update a card successfully' })
    @ApiNotFoundResponse({ description: 'Card not found' })
    update(@Param('id') id: string, @Body() cardDto: CardDto) {
        return this.cardsService.update(id, cardDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Remove a card',
    })
    @ApiCreatedResponse({ description: 'Remove a card successfully' })
    @ApiNotFoundResponse({ description: 'Card not found' })
    remove(@Param('id') id: string) {
        return this.cardsService.remove(id);
    }
}
