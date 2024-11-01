import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { jwtMock, loginUserMock, returnLoginMock } from '../__mocks__/auth.mock';
import { UserDataDto } from '../../user/dtos/data.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
    let service: AuthService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findUserByEmail: jest
                            .fn()
                            .mockResolvedValue(userEntityMock),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: () => jwtMock,
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    it('should return user if password invalid and email valid', async () => {
        expect(
            service.login({ ...loginUserMock, password: '4324' }),
        ).rejects.toThrow(NotFoundException);
    });

    it('should return user if email not exist', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

        expect(service.login(loginUserMock)).rejects.toThrow(
            'E-mail or password invalid',
        );
    });

    it('should return error in UserService', async () => {
        jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(
            new NotFoundException(),
        );

        expect(service.login(loginUserMock)).rejects.toThrow(
            'E-mail or password invalid',
        );
    });

    it('should return access token and user data if credentials are correct', async () => {

        const result = await service.login(loginUserMock);

        expect(result).toEqual({
            accessToken: jwtMock,
            user: new UserDataDto(userEntityMock)
        });
    });
});
