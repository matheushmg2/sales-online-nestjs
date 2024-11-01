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
                        find: jest.fn().mockResolvedValue([userEntityMock]),
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

    describe('findUserByEmail', () => {
        it('should return if the user email was found', async () => {
            const user = await service.findUserByEmail(userEntityMock.email);

            expect(user).toEqual(userEntityMock);
        });

        it('should return throw NotFoundException if user is not found', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

            expect(
                service.findUserByEmail(userEntityMock.email),
            ).rejects.toThrow(NotFoundException);
        });

        it('should return an error that the user email was not found in the database', async () => {
            jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
                new NotFoundException(),
            );

            expect(
                service.findUserByEmail(userEntityMock.email),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('findUserById', () => {
        it('should return user if found', async () => {
            const user = await service.findUserById(userEntityMock.id);

            expect(user).toEqual(userEntityMock);
        });

        it('should throw BadRequestException if userId is invalid', async () => {
            await expect(service.findUserById('invalid-uuid')).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

            await expect(
                service.findUserById(userEntityMock.id),
            ).rejects.toThrow(NotFoundException);
        });

        it('should return an error that the user id was not found in the database', async () => {
            jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
                new NotFoundException(),
            );

            expect(service.findUserById(userEntityMock.id)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('getUserByIdUsingRelations', () => {
        it('should return the user if found and their address', async () => {
            const user = await service.getUserByIdUsingRelations(
                userEntityMock.id,
            );

            expect(user).toEqual(userEntityMock);
        });
    });

    describe('create', () => {
        it('should return erro if user exist', async () => {
            expect(service.create(createUserMock)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should return erro if user not exist', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
                undefined,
            );

            const user = await service.create(createUserMock);

            expect(user).toEqual(userEntityMock);
        });
    });

    describe('getAllUser', () => {
        it('should return list of user', async () => {
            const users = await service.getAllUser();

            expect(users).toEqual([userEntityMock]);
        });

        it('should return error in exception', async () => {
            jest.spyOn(userRepository, 'find').mockRejectedValueOnce(
                new NotFoundException(),
            );
            expect(service.getAllUser()).rejects.toThrow(NotFoundException);
        });
    });
});
