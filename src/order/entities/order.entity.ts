import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { AddressEntity } from '../../address/entities/address.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @Column({ name: 'address_id', nullable: false })
    addressId: string;

    @CreateDateColumn({ name: 'date' })
    date: Date;

    @Column({ name: 'payment_id', nullable: false })
    paymentId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;

    @ManyToOne(() => AddressEntity, (address) => address.orders)
    @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
    address?: AddressEntity;

    @ManyToOne(() => PaymentEntity, (payment) => payment.orders)
    @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
    payment?: PaymentEntity;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
    ordersProduct?: OrderProductEntity[];

    amountProducts?: number;
}
