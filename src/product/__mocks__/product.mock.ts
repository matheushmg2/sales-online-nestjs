import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from '../dtos/create.dto';
import { ProductEntity } from '../entities/product.entity';
import { categoryEntityMock } from '../../category/__mocks__/category.mock';
import { DeleteResult } from 'typeorm';

export const productEntityMock: ProductEntity = {
    id: uuidv4(),
    categoryId: categoryEntityMock.id,
    name: 'name product mock',
    price: 10,
    imageId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

export const createProductMock: CreateProductDto = {
    categoryId: categoryEntityMock.id,
    image: 'lkfdjsafkldsa',
    name: 'name mock product',
    price: 25.0,
};

export const returnDeleteMock: DeleteResult = {
    raw: [],
    affected: 1,
};
