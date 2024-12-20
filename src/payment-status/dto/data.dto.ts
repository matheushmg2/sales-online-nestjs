
import { PaymentStatusEntity } from '../entities/payment-status.entity';

export class PaymentStatusDataDto {
    id: string;
    name: string;
  
    constructor(paymentStatus: PaymentStatusEntity) {
      this.id = paymentStatus.id;
      this.name = paymentStatus.name;
    }
}
