import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    id: string;

    userId: string;

    @IsString()
    @IsOptional()
    complement: string;

    @IsInt()
    number: number;

    @IsString()
    cep: string;

    @IsString()
    cityId: string;

    createdAt: Date;
    updatedAt: Date;

}