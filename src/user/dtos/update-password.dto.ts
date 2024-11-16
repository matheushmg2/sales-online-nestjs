import { IsString } from 'class-validator';

export class UpdatePasswordUserDto {
    @IsString()
    newPassword: string;

    @IsString()
    lastPassword: string;
}
