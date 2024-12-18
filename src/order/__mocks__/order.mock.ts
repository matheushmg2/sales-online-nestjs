import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../entities/order.entity';
import { addressEntityMock } from '../../address/__mocks__/address.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { paymentEntityMock } from '../../payment/__mocks__/payment.mock';

export const orderEntityMock: OrderEntity = {
    addressId: addressEntityMock.id,
    createdAt: new Date(),
    date: new Date(),
    id: uuidv4(),
    paymentId: paymentEntityMock.id,
    updatedAt: new Date(),
    userId: userEntityMock.id,
  };
