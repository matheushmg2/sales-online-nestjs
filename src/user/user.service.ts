import { Injectable } from '@nestjs/common';
<<<<<<< Updated upstream
import { ICreateUserDto } from './dtos/create.dto';
import { UserEntity } from './interfaces/user.entity';
=======
import { CreateUserDto } from './dtos/create.dto';
import { UserEntity } from './entities/user.entity';
>>>>>>> Stashed changes
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }


    async create(user: CreateUserDto): Promise<any> {

        const saltOrRounds = 10;

        const passwordHashed = await hash(user.password, saltOrRounds)

        const typeUser = user.type_user ?? 0;

        return this.userRepository.save({
            ...user,
            type_user: typeUser,
            password: passwordHashed
        });
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
