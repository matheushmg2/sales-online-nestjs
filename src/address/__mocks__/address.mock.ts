import { CreateAddressDto } from "../dtos/create.dto";
import { AddressEntity } from "../entities/address.entity";
import { v4 as uuidv4 } from 'uuid';

export const userId = uuidv4();
export const cityId = uuidv4();

export const createAddressDto: CreateAddressDto = {
    id: uuidv4(),
    userId: uuidv4(),
    complement: "home",
    number: 0,
    cep: "12340000",
    cityId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
};

export const addressEntityMock: AddressEntity = {
    id: uuidv4(),
    userId: uuidv4(),
    complement: "home",
    number: 0,
    cep: "12340000",
    cityId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
};