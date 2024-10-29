import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginAuthDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDataDto } from './dtos/data.dto';
import { UserDataDto } from '../user/dtos/data.dto';
import { PayloadDataDto } from './dtos/payload.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(login: LoginAuthDto): Promise<AuthDataDto> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(login.email).catch(() => undefined);

        const isMatch = await compare(login.password, user?.password || '');

        if (!user || !isMatch) {
            throw new NotFoundException('E-mail or password invalid');
        }

        return {
            accessToken: this.jwtService.sign({...new PayloadDataDto(user)}),
            user: new UserDataDto(user)
        };

    }

}
