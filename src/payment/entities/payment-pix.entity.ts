import { ChildEntity, Column, CreateDateColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CreateOrderDto } from '../../order/dto/create-order.dto';

@ChildEntity()
export class Pix extends PaymentEntity {
    @Column({ name: 'code', nullable: false })
    code: string;

    @Column({ name: 'date_payment', nullable: false })
    datePayment: Date;

    constructor(
        statusId: string,
        price: number,
        discount: number,
        finalPrice: number,
        createOrderDto: CreateOrderDto,
    ) {
        super(statusId, price, discount, finalPrice);
        this.code = createOrderDto?.codePix || "";
        this.datePayment = new Date(createOrderDto?.datePayment || '');
    }
}
