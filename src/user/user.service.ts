import { Injectable } from '@nestjs/common';
import { ICreateUserDto } from './dtos/create.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }


    async create(user: ICreateUserDto): Promise<UserEntity> {

        const saltOrRounds = 10;

        const passwordHashed = await hash(user.password, saltOrRounds)

        return this.userRepository.save({
            ...user,
            password: passwordHashed
        });
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
