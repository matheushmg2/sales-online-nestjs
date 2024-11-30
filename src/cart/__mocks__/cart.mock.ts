import { v4 as uuidv4 } from 'uuid';
import { CartEntity } from '../entities/cart.entity';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

export const CartEntityMock: CartEntity = {
    id: uuidv4(),
    userId: uuidv4(),
    active: false,
    createdAt: new Date(),
    updatedAt: new Date()
};

export const CreateCart: CreateCartDto = {
    productId: uuidv4(),
    amount: 1
};

export const UpdateCart: UpdateCartDto = {
    productId: uuidv4(),
    amount: 2
};