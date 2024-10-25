export interface ICreateUserDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    type_user: number;
    created_at: Date;
    updated_at: Date;
}