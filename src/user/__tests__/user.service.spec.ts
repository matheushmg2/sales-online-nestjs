import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(userEntityMock),
                        save: jest.fn().mockResolvedValue(userEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    // findUserByEmail
    it('should return if the user email was found - findUserByEmail', async () => {
        const user = await service.findUserByEmail(userEntityMock.email);

        expect(user).toEqual(userEntityMock);
    });

    it('should return throw NotFoundException if user is not found - findUserByEmail', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow();
    });

    it('should return an error that the user email was not found in the database - findUserByEmail', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new NotFoundException(),
        );
        //const user = await ;

        expect(service.findUserByEmail(userEntityMock.email)).rejects.toThrow(
            NotFoundException,
        );
    });

    // findUserById
    it('should return user if found - findUserById', async () => {
        const user = await service.findUserById(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    it('should throw BadRequestException if userId is invalid - findUserById', async () => {
        await expect(service.findUserById('invalid-uuid')).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should throw NotFoundException if user is not found - findUserById', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

        await expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
            NotFoundException,
        );
    });

    it('should return an error that the user id was not found in the database - findUserById', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new NotFoundException(),
        );

        expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
            NotFoundException,
        );
    });

    // getUserByIdUsingRelations
    it('should return the user if found and their address - getUserByIdUsingRelations', async () => {
        const user = await service.getUserByIdUsingRelations(userEntityMock.id);

        expect(user).toEqual(userEntityMock);
    });

    // create
    it('should return erro if user exist - create', async () => {
        expect(service.create(createUserMock)).rejects.toThrow(
            BadRequestException,
        );
    });

    it('should return erro if user not exist - create', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

        const user = await service.create(createUserMock)

        expect(user).toEqual(userEntityMock);
    });
});
