import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../entities/address.entity';
import { UserService } from '../../user/user.service';
import { CityService } from '../../city/city.service';
import { NotFoundException } from '@nestjs/common';
import { addressEntityMock, createAddressDto, userId } from '../__mocks__/address.mock';

describe('AddressService', () => {
    let service: AddressService;
    let addressRepository: Repository<AddressEntity>;
    let userService: UserService;
    let cityService: CityService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AddressService,
                {
                    provide: getRepositoryToken(AddressEntity),
                    useValue: {
                        save: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findUserById: jest.fn(),
                    },
                },
                {
                    provide: CityService,
                    useValue: {
                        findCityById: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AddressService>(AddressService);
        addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
        userService = module.get<UserService>(UserService);
        cityService = module.get<CityService>(CityService);
    });

    describe('create', () => {
        it('should throw NotFoundException if userId is not found', async () => {
            jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new NotFoundException());

            await expect(service.create(createAddressDto, 'invalid-user-id')).rejects.toThrow(NotFoundException);
            expect(userService.findUserById).toHaveBeenCalledWith('invalid-user-id');
        });

        it('should throw NotFoundException if cityId is not found', async () => {
            jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(undefined);
            jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new NotFoundException());

            await expect(service.create(createAddressDto, userId)).rejects.toThrow(NotFoundException);
            expect(userService.findUserById).toHaveBeenCalledWith(userId);
            expect(cityService.findCityById).toHaveBeenCalledWith(createAddressDto.cityId);
        });

        it('should create and return a new address if userId and cityId are valid', async () => {
            jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(undefined);
            jest.spyOn(cityService, 'findCityById').mockResolvedValueOnce(undefined);
            jest.spyOn(addressRepository, 'save').mockResolvedValueOnce(addressEntityMock);

            const address = await service.create(createAddressDto, userId);

            expect(address).toEqual(addressEntityMock);
            expect(userService.findUserById).toHaveBeenCalledWith(userId);
            expect(cityService.findCityById).toHaveBeenCalledWith(createAddressDto.cityId);
            expect(addressRepository.save).toHaveBeenCalledWith({ ...createAddressDto, userId });
        });
    });
});
