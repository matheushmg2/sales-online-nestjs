import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
    @IsString()
    name: string;

    @IsNumber()
    size: number;

    @IsString()
    key: string;

    @IsString()
    url: string;
}
