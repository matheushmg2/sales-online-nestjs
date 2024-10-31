import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";
import { v4 as uuidv4 } from 'uuid';

export const userEntityMock: UserEntity = {
        id: uuidv4(),
        name: "User Teste Mock",
        email: "user@teste.mock",
        phone: "12345678910",
        cpf: "12345678910",
        password: "123456789",
        type_user: UserType.User,
        created_at: new Date(),
        updated_at: new Date()
}