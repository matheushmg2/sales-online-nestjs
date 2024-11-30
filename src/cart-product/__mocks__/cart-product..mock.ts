import { v4 as uuidv4 } from 'uuid';
import { CartProductEntity } from '../entities/cart-product.entity';

export const CartProductEntityMock: CartProductEntity = {
    id: uuidv4(),
    cart_id: uuidv4(),
    product_id: uuidv4(),
    amount: 1,
    createdAt: new Date(),
    updatedAt: new Date()
};

