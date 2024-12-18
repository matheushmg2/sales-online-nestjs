import { v4 as uuidv4 } from 'uuid';
import { addressEntityMock } from '../../address/__mocks__/address.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { paymentEntityMock } from '../../payment/__mocks__/payment.mock';
import { OrderProductEntity } from '../entities/order-product.entity';
import { orderEntityMock } from '../../order/__mocks__/order.mock';
import { productEntityMock } from '../../product/__mocks__/product.mock';

export const orderProductEntityMock: OrderProductEntity = {
    amount: 543,
    createdAt: new Date(),
    id: uuidv4(),
    orderId: orderEntityMock.id,
    price: 543.4,
    productId: productEntityMock.id,
    updatedAt: new Date(),
  };