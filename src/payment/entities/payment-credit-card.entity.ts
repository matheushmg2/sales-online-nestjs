import {
    ChildEntity,
    Column,
} from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class ProductCreditCardEntity extends PaymentEntity {
    @Column({ name: 'amount_payments', nullable: false })
    amount_payments: number;
}
