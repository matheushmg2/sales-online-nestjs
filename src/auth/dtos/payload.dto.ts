import { UserEntity } from "../../user/entities/user.entity";

export class PayloadDataDto {
    id: string;
    type_user: number;

    constructor(user: UserEntity) {
        this.id = user.id,
        this.type_user = user.type_user
    }
}