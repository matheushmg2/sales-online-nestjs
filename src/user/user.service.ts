import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordUserDto } from './dtos/update-password.dto';
import { hashedPassword, validatePassword } from '../utils/isValidePassword';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserByIdUsingRelations(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: {
                id,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    },
                },
            },
        });
    }

    async findUserById(userId: string): Promise<UserEntity> {
        if (!isUUID(userId)) {
            throw new BadRequestException('UserId Not Found');
        }

        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException('UserId Not Found');
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException('E-mail Not Found');
        }

        return user;
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        const isEmail = await this.findUserByEmail(user.email).catch(
            () => undefined,
        );

        if (isEmail) {
            throw new BadRequestException('E-mail registered in system');
        }

        const saltOrRounds = 10;

        const passwordHashed = await hashedPassword(user.password);

        return this.userRepository.save({
            ...user,
            type_user: UserType.User,
            password: passwordHashed,
        });
    }

    

    async updatePassword(data: UpdatePasswordUserDto, userId: string): Promise<UserEntity> {
        const user = await this.findUserById(userId);

        const passwordHashed = await hashedPassword(data.newPassword);

        const isMatch = await validatePassword(data.lastPassword, user.password || '');

        if(!isMatch) {
            throw new BadRequestException('Last password invalid');
        }
        

        return this.userRepository.save({
            ...user,
            password: passwordHashed,
        });
    }
}
