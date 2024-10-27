import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';
<<<<<<< Updated upstream
import { UserEntity } from './interfaces/user.entity';
=======
import { UserEntity } from './entities/user.entity';
import { UserDataDto } from './dtos/data.dto';
>>>>>>> Stashed changes

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAllUser(): Promise<UserDataDto[]> {
        return (await this.userService.getAllUser()).map(data => new UserDataDto(data));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async create(
        @Body() create: CreateUserDto
    ): Promise<UserEntity> {
        return this.userService.create(create);
    }
}