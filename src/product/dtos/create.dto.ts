import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    
    @IsString()
    categoryId: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;
}
