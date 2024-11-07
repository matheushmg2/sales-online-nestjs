import { v4 as uuidv4 } from 'uuid';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/create.dto';

export const categoryEntityMock: CategoryEntity = {
    id: uuidv4(),
    name: 'State Fake',
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const createCategoryEntityMock: CreateCategoryDto = {
    name: 'State Fake',
};
