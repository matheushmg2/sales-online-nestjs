import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserDataDto } from './dtos/data.dto';
import { UpdatePasswordUserDto } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(UserType.Admin, UserType.Root)
    @Get("/all")
    async getAllUser(): Promise<UserDataDto[]> {
        return (await this.userService.getAllUser()).map(
            (data) => new UserDataDto(data),
        );
    }

    @Roles(UserType.Admin, UserType.Root)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: string): Promise<UserDataDto> {
        return new UserDataDto(
            await this.userService.getUserByIdUsingRelations(userId),
        );
    }
    

    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() create: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(create);
    }

    @UsePipes(ValidationPipe)
    @Roles(UserType.Root)
    @Post("/admin")
    async createAdmin(@Body() create: CreateUserDto): Promise<UserEntity> {
        return this.userService.create(create, true);
    }

    @UsePipes(ValidationPipe)
    @Patch()
    async updatePassword(
        @Body() update: UpdatePasswordUserDto,
        @UserId() userId: string,
    ): Promise<UserEntity> {
        return this.userService.updatePassword(update, userId);
    }

    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Get()
    async getInfoUser(@UserId() userId: string): Promise<UserDataDto> {
        return new UserDataDto(
            await this.userService.getUserByIdUsingRelations(userId),
        );
    }
}
