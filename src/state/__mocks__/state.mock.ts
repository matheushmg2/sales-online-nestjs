
import { v4 as uuidv4 } from 'uuid';
import { StateEntity } from '../entities/state.entity';

export const stateEntityMock: StateEntity = {
        id: uuidv4(),
        name: 'State Fake',
        uf: 'SF',
        createdAt: new Date(),
        updatedAt: new Date()
}