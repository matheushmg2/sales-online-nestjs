import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAllUser(): Promise<UserEntity[]> {
        return this.userService.getAllUser();
    }

    @Post()
    async create(
        @Body() create: ICreateUserDto
    ): Promise<UserEntity> {
        return this.userService.create(create);
    }
}