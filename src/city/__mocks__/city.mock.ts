import { v4 as uuidv4 } from 'uuid';
import { CityEntity } from '../entities/city.entity';

export const stateId = uuidv4();
export const cityId = uuidv4();

export const cityEntityMock: CityEntity = {
    id: cityId,
    name: 'City Teste Mock',
    stateId: stateId,
    createdAt: new Date(),
    updatedAt: new Date(),
};
