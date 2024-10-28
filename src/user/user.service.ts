import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
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

        if(!user) {
            throw new NotFoundException('UserId Not Found');
        }

        return user;
    }


    async create(user: CreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;

        const passwordHashed = await hash(user.password, saltOrRounds)

        const typeUser = user.type_user ?? 0;

        return this.userRepository.save({
            ...user,
            type_user: typeUser,
            password: passwordHashed
        });
    }

    
}
