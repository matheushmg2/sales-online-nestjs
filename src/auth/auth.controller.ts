import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDataDto } from '../user/dtos/data.dto';
import { LoginAuthDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AuthDataDto } from './dtos/data.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async login(@Body() login: LoginAuthDto): Promise<AuthDataDto> {
        return await this.authService.login(login);
    }

}
