import { UserDataDto } from "../../user/dtos/data.dto";

export interface AuthDataDto {
    user: UserDataDto;
    accessToken: string;
}