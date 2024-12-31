import { IsDate, IsDecimal, IsInt, IsString } from "class-validator";

export class CreateUserDto {
    //id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    cpf: string;

    @IsString()
    password: string;

    type_user: number;

    //created_at: Date;

    //updated_at: Date;
}