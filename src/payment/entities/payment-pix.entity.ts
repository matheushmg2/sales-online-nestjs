import {
    ChildEntity,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class ProductPixEntity extends PaymentEntity {
    @Column({ name: 'code', nullable: false })
    code: string;

    @CreateDateColumn({ name: 'date_payment' })
    datePayment: Date;
}
