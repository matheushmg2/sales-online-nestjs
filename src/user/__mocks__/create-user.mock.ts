import { CreateUserDto } from "../dtos/create.dto";
import { UserType } from "../enum/user-type.enum";

export const createUserMock: CreateUserDto = {
        name: "User Teste Mock",
        email: "user@teste.mock",
        phone: "12345678910",
        cpf: "12345678910",
        password: "123456789",
        type_user: UserType.User,
}