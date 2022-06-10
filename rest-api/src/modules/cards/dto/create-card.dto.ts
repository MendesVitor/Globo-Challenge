import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export class CreateCardDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    text: string;

    @IsDefined()
    @IsNotEmpty()
    tagsId: string[];

    tags?: Tag[];
}
