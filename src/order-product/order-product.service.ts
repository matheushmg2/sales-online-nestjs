import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectRepository(OrderProductEntity)
        private readonly orderProductRepository: Repository<OrderProductEntity>,
    ) {}

    async createOrderProduct(
        orderId: string,
        productId: string,
        amount: number,
        price: number,
    ): Promise<OrderProductEntity> {
        return this.orderProductRepository.save({
            orderId,
            productId,
            amount,
            price,
        });
    }
}
