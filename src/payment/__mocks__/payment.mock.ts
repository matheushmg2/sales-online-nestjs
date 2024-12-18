import { PaymentType } from '../../payment-status/enum/payment-type.enum';
import { CreditCard } from '../entities/payment-credit-card.entity';
import { Pix } from '../entities/payment-pix.entity';
import { PaymentEntity } from '../entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

export const paymentEntityMock: PaymentEntity = {
    createdAt: new Date(),
    discount: 432,
    finalPrice: 64365.4,
    id: uuidv4(),
    price: 32532.0,
    statusId: uuidv4(),
    updatedAt: new Date(),
    type: '',
};

export const paymentPixEntityMock: Pix = {
    ...paymentEntityMock,
    code: 'fdsafdsa',
    datePayment: new Date('2020-01-01'),
};

export const paymentCreditCardEntityMock: CreditCard = {
    ...paymentEntityMock,
    amountPayments: 54,
  };