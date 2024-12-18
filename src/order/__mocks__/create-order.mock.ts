import { addressEntityMock } from "../../address/__mocks__/address.mock";
import { paymentCreditCardEntityMock, paymentPixEntityMock } from "../../payment/__mocks__/payment.mock";
import { CreateOrderDto } from "../dto/create-order.dto";

export const createOrderPixMock: CreateOrderDto = {
    addressId: addressEntityMock.id,
    codePix: paymentPixEntityMock.code,
    datePayment: '2020-01-01',
  };
  
  export const createOrderCreditCardMock: CreateOrderDto = {
    addressId: addressEntityMock.id,
    amountPayments: paymentCreditCardEntityMock.amountPayments,
  };