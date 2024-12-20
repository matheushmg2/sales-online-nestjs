import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UserDataDto } from '../../user/dtos/data.dto';
import { AddressDataDto } from '../../address/dtos/data.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderProductDataDto } from '../../order-product/entities/data.dto';
import { PaymentDataDto } from '../../payment/dto/data.dto';

export class OrderDataDto {
    id: string;
    date: string;
    //userId: string;
    //addressId: string;
    //paymentId: string;
    user?: UserDataDto;
    address?: AddressDataDto;
    payment?: PaymentDataDto;
    ordersProduct?: OrderProductDataDto[];
    amountProducts?: number;

    constructor(order?: OrderEntity) {
        this.id = order?.id;
        this.date = order?.date.toString();
        //this.userId = order?.userId;
        //this.addressId = order?.addressId;
        //this.paymentId = order?.paymentId;
        this.user = order?.user ? new UserDataDto(order?.user) : undefined;
        this.address = order?.address
            ? new AddressDataDto(order?.address)
            : undefined;
        this.payment = order?.payment
            ? new PaymentDataDto(order?.payment)
            : undefined;
        this.ordersProduct = order?.ordersProduct
            ? order?.ordersProduct.map(
                  (orderProduct) => new OrderProductDataDto(orderProduct),
              )
            : undefined;
        this.amountProducts = order?.amountProducts;
    }
}
