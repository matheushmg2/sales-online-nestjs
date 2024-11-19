import { CartDataDto } from '../../cart/dto/data-cart.dto';
import { ProductDataDto } from '../../product/dtos/data.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class CartProductDataDto {
    id: string;
    cartId: string;
    productId: string;
    amount: number;
    product?: ProductDataDto;
    cart?: CartDataDto;

    constructor(cartProduct: CartProductEntity) {
        this.id = cartProduct.id;
        this.cartId = cartProduct.cart_id;
        this.productId = cartProduct.product_id;
        this.amount = cartProduct.amount;
        this.product = cartProduct.products ? new ProductDataDto(cartProduct.products) : undefined;
        this.cart = cartProduct.carts ? new CartDataDto(cartProduct.carts) : undefined;
    }
}
