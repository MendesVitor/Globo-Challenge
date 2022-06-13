import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export class CardDto {
    @ApiProperty({ description: 'Card text', example: 'my card' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    text: string;

    @ApiProperty({
        description: 'The id of the tags to add to the card',
        type: [String],
        example: [randomUUID(), randomUUID()],
    })
    @IsDefined()
    @IsNotEmpty()
    @IsOptional()
    tagsId: string[];

    @ApiHideProperty()
    tags?: Tag[];
}
