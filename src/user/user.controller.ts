import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserDataDto } from './dtos/data.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @Get()
    async getAllUser(): Promise<UserDataDto[]> {
        return (await this.userService.getAllUser()).map(data => new UserDataDto(data));
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: string): Promise<UserDataDto> {
        return new UserDataDto( await this.userService.getUserByIdUsingRelations(userId));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async create(
        @Body() create: CreateUserDto
    ): Promise<UserEntity> {
        return this.userService.create(create);
    }
}