import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PaymentService } from '../payment/payment.service';
import { PaymentEntity } from '../payment/entities/payment.entity';
import { CartService } from '../cart/cart.service';
import { OrderProductService } from '../order-product/order-product.service';
import { ProductService } from '../product/product.service';
import { OrderProductEntity } from '../order-product/entities/order-product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductEntity } from '../product/entities/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private readonly paymentService: PaymentService,
        private readonly cartService: CartService,
        private readonly orderProductService: OrderProductService,
        private readonly productService: ProductService,
    ) {}

    async savaOrder(
        userId: string,
        createOrderDto: CreateOrderDto,
        payment: PaymentEntity,
    ): Promise<OrderEntity> {
        return await this.orderRepository.save({
            userId,
            addressId: createOrderDto.addressId,
            date: new Date(),
            paymentId: payment.id,
        });
    }

    async createOrderProductUsingCart(
        cart: CartEntity,
        orderId: string,
        products: ProductEntity[],
    ): Promise<OrderProductEntity[]> {
        return await Promise.all(
            cart.cartProduct?.map((cartProduct) =>
                this.orderProductService.createOrderProduct(
                    orderId,
                    cartProduct.product_id,
                    cartProduct.amount,
                    products.find(
                        (product) => product.id === cartProduct.product_id,
                    )?.price || 0,
                ),
            ),
        );
    }

    async create(
        createOrderDto: CreateOrderDto,
        userId: string,
    ): Promise<OrderEntity> {
        const cart = await this.cartService.findCartByUserId(userId, true);

        const products = await this.productService.findAllProduct(
            cart.cartProduct?.map((cartProduct) => cartProduct.product_id),
        );

        const payment: PaymentEntity = await this.paymentService.createPayment(
            createOrderDto,
            products,
            cart,
        );

        const order = await this.savaOrder(userId, createOrderDto, payment);

        await this.createOrderProductUsingCart(cart, order.id, products);

        await this.cartService.clearCart(userId);

        return order;
    }

    async findOrderByUserId(userId: string) {
        const orders = await this.orderRepository.find({
            where: {
                userId,
            },
            relations: {
                address: true,
                ordersProduct: {
                    product: true,
                },
                payment: {
                    paymentStatus: true,
                },
            },
        });

        if (!orders || orders.length === 0) {
            throw new NotFoundException('Orders not found');
        }

        return orders;
    }
}
