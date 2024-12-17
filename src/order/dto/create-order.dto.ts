import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    addressId: string;
    
    @IsOptional()
    @IsNumber()
    amountPayments?: number;

    @IsOptional()
    @IsString()
    codePix?: string;

    @IsOptional()
    @IsString()
    datePayment?: string;
}
