import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../address.controller';
import { AddressService } from '../address.service';
import { CreateAddressDto } from '../dtos/create.dto';
import { AddressEntity } from '../entities/address.entity';
import { AddressDataDto } from '../dtos/data.dto';
import { AddressCreateDto } from '../__mocks__/address.mock';

describe('AddressController', () => {
    let addressController: AddressController;
    let addressService: AddressService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AddressController],
        providers: [
          {
            provide: AddressService,
            useValue: {
              create: jest.fn(),
              findAddressByUserId: jest.fn(),
            },
          },
        ],
      }).compile();
  
      addressController = module.get<AddressController>(AddressController);
      addressService = module.get<AddressService>(AddressService);
    });
  
    it('should be defined', () => {
      expect(addressController).toBeDefined();
    });
  
    describe('create', () => {
      it('should create a new address', async () => {
        const createAddressDto: CreateAddressDto = AddressCreateDto;
        const userId = 'user-id';
        const result: AddressEntity = { id: 'address-id', ...createAddressDto };
  
        jest.spyOn(addressService, 'create').mockResolvedValue(result);
  
        expect(await addressController.create(createAddressDto, userId)).toEqual(result);
        expect(addressService.create).toHaveBeenCalledWith(createAddressDto, userId);
      });
    });
  
    describe('findAddressByUserId', () => {
        it('should return a list of addresses for a user', async () => {
          const userId = 'user-id';
          const addresses = [
            {
              complement: 'Apt 101',
              number: 123,
              cep: '12345-678',
              city: { name: 'City 1', state: 'State 1' },
            },
            {
              complement: 'House B',
              number: 456,
              cep: '98765-432',
              city: { name: 'City 2', state: 'State 2' },
            },
          ];
          const result = addresses.map((data) => new AddressDataDto(data as unknown as AddressEntity));
      
          jest.spyOn(addressService, 'findAddressByUserId').mockResolvedValue(addresses as unknown as AddressEntity[]);
      
          expect(await addressController.findAddressByUserId(userId)).toEqual(result);
          expect(addressService.findAddressByUserId).toHaveBeenCalledWith(userId);
        });
      });
  });