import { OrderDataDto } from '../../order/dto/data.dto';
import { ProductDataDto } from '../../product/dtos/data.dto';
import { OrderProductEntity } from './order-product.entity';

export class OrderProductDataDto {
    id: string;
    orderId: string;
    productId: string;
    amount: number;
    price: number;
    order?: OrderDataDto;
    product?: ProductDataDto;

    constructor(orderProduct: OrderProductEntity) {
        this.id = orderProduct.id;
        this.orderId = orderProduct.orderId;
        this.productId = orderProduct.productId;
        this.amount = orderProduct.amount;
        this.price = orderProduct.price;
        this.order = orderProduct.order
            ? new OrderDataDto(orderProduct.order)
            : undefined;
        this.product = orderProduct.product
            ? new ProductDataDto(orderProduct.product)
            : undefined;
    }
}
