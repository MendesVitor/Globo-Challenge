import { IsDefined, IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateTagDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;
}
