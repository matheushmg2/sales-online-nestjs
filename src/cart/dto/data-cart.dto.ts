import { CartEntity } from '../entities/cart.entity';
import { CartProductDataDto } from '../../cart-product/dtos/data.dto';

export class CartDataDto {
    id: string;
    cartProduct: CartProductDataDto[];

    constructor(cart: CartEntity) {
        this.id = cart.id;
        this.cartProduct = cart.cartProduct
            ? cart.cartProduct.map(
                  (cartProduct) => new CartProductDataDto(cartProduct),
              )
            : undefined;
    }
}
