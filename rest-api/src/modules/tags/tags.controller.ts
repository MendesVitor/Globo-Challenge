import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('Tag')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    @ApiOperation({
        summary: 'Creates a tag',
    })
    @ApiCreatedResponse({ description: 'Creates a tag successfully' })
    @ApiConflictResponse({ description: 'Tag already exists' })
    create(@Body() tagDto: TagDto) {
        return this.tagsService.create(tagDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all tags',
    })
    @ApiCreatedResponse({ description: 'Get all tags successfully' })
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get tag by id',
    })
    @ApiCreatedResponse({ description: 'Get tag by id successfully' })
    @ApiConflictResponse({ description: 'Tag already exists' })
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Updates a tag',
    })
    @ApiNoContentResponse({ description: 'Updates a tag successfully' })
    @ApiNotFoundResponse({ description: 'Tag not found' })
    @ApiConflictResponse({ description: 'Tag already exists' })
    update(@Param('id') id: string, @Body() tagDto: TagDto) {
        return this.tagsService.update(id, tagDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Removes a tag',
    })
    @ApiNoContentResponse({ description: 'Removes a tag successfully' })
    @ApiNotFoundResponse({ description: 'Tag not found' })
    remove(@Param('id') id: string) {
        return this.tagsService.remove(id);
    }
}
