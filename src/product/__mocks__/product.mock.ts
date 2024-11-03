
import { v4 as uuidv4 } from 'uuid';

export const productEntityMock: any = {
        id: uuidv4(),
        name: 'State Fake',
        uf: 'SF',
        createdAt: new Date(),
        updatedAt: new Date()
}