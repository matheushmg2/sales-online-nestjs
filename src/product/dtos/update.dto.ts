import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
    
    @IsString()
    categoryId: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;
}
