import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { PaymentType } from '../payment-status/enum/payment-type.enum';
import { CreditCard } from './entities/payment-credit-card.entity';
import { Pix } from './entities/payment-pix.entity';
import { PaymentStatusService } from '../payment-status/payment-status.service';
import { ProductEntity } from '../product/entities/product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { CartProductEntity } from '../cart-product/entities/cart-product.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentEntity: Repository<PaymentEntity>,
        private readonly paymentStatusService: PaymentStatusService,
    ) {}

    async generateFinalPrice(cart: CartEntity, products: ProductEntity[]) {
        if (!cart.cartProduct || cart.cartProduct.length === 0) {
            return 0;
        }

        return await cart.cartProduct
            .map((cartProduct: CartProductEntity) => {
                const product = products.find(
                    (product) => product.id === cartProduct.product_id,
                );
                if (product) {
                    return cartProduct.amount * product.price;
                }
                return 0;
            })
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );
    }

    async createPayment(
        createOrderDto: CreateOrderDto,
        products: ProductEntity[],
        cart: CartEntity,
    ): Promise<PaymentEntity> {
        const paymentStatusId =
            await this.paymentStatusService.findPaymentStatusByName(
                PaymentType.Done,
            );

        const finalPrice = await this.generateFinalPrice(cart, products);

        const { amountPayments, codePix, datePayment } = createOrderDto;

        if (amountPayments) {
            const paymentCreditCard = new CreditCard(
                paymentStatusId,
                finalPrice,
                0,
                finalPrice,
                createOrderDto,
            );

            return this.paymentEntity.save(paymentCreditCard);
        } else if (codePix && datePayment) {
            const paymentPix = new Pix(
                paymentStatusId,
                finalPrice,
                0,
                finalPrice,
                createOrderDto,
            );

            return this.paymentEntity.save(paymentPix);
        }

        throw new BadRequestException(
            'Amount Payments or code pix or date payment not found',
        );
    }
}
