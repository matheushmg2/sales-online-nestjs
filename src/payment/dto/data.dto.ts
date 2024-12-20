
import { PaymentStatusDataDto } from '../../payment-status/dto/data.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentDataDto {
    id: string;
  statusId: string;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: PaymentStatusDataDto;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new PaymentStatusDataDto(payment.paymentStatus)
      : undefined;
  }
}
