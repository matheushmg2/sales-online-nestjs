import { AddressDataDto } from "../../address/dtos/data.dto";
import { UserEntity } from "../entities/user.entity";

export class UserDataDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    type_user: number;
    created_at: Date;
    updated_at: Date;
    address?: AddressDataDto[];

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.email = userEntity.email;
        this.phone = userEntity.phone;
        this.address = userEntity.addresses ? userEntity.addresses.map((data) => new AddressDataDto(data)) : undefined;
    }

    /**
    // -> Um exemplo para que possa passar por paramentro | An example so that can to pass as a parameter

    // Dentro do controller precisará passar o seguinte | Inside the controller will need to pass the following

    // return (await this.userService.getAllUser()).map(data => new UserDataDto({id: data.id}).toJSON()) as UserDataDto[]
    
    constructor(userEntity: Partial<UserEntity>) {
        this.id = userEntity.id ?? '';
        this.name = userEntity.name ?? '';
        this.email = userEntity.email ?? '';
        this.phone = userEntity.phone ?? '';
        this.cpf = userEntity.cpf ?? '';
        this.password = userEntity.password ?? '';
        this.type_user = userEntity.type_user ?? null;
        this.created_at = userEntity.created_at ?? null;
        this.updated_at = userEntity.updated_at ?? null;
    }

    // Função para retornar apenas campos com valores definidos | Function to return only fields with defined values
    public toJSON(): Partial<UserDataDto> {
        return Object.entries(this)
            .filter(([_, value]) => value !== undefined && value !== null && value !== '' && !(typeof value === 'number' && isNaN(value)))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    }
    */

}