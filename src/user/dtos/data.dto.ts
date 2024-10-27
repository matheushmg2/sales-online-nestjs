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

    constructor(userEntity: UserEntity) {
        this.id = userEntity.id;
    }

    /**
    // -> Um exemplo para que possa passar por paramentro 

    // Dentro do controller precisará passar o seguinte

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

    // Função para retornar apenas campos com valores definidos
    public toJSON(): Partial<UserDataDto> {
        return Object.entries(this)
            .filter(([_, value]) => value !== undefined && value !== null && value !== '' && !(typeof value === 'number' && isNaN(value)))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    }
    */
    
}