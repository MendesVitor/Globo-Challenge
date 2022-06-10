import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
    @ApiProperty({ description: 'Tag name', example: 'tag' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;
}
