import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCartDto } from '../cart/dto/create-cart.dto';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductService } from '../product/product.service';
import { isUUID } from 'class-validator';
import { UpdateCartDto } from '../cart/dto/update-cart.dto';

@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService,
    ) {}

    async verifyProductInCart(
        product_id: string,
        cart_id: string,
    ): Promise<CartProductEntity> {
        if (!isUUID(cart_id) && !isUUID(product_id)) {
            throw new BadRequestException('Cart or Product Not Found');
        }

        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                product_id,
                cart_id,
            },
        });

        if (!cartProduct) {
            throw new NotFoundException('Product not found in cart');
        }

        return cartProduct;
    }

    async create(
        createCartDto: CreateCartDto,
        cart_id: string,
    ): Promise<CartProductEntity> {
        if (!isUUID(cart_id)) {
            throw new BadRequestException('Cart Not Found');
        }

        const isValidAmount = createCartDto.amount > 0;

        if (!isValidAmount) {
            throw new BadRequestException(
                'the value must be greater than zero',
            );
        }

        return await this.cartProductRepository.save({
            amount: createCartDto.amount,
            product_id: createCartDto.productId,
            cart_id,
        });
    }

    async addProductInCart(
        createCartDto: CreateCartDto,
        cart: CartEntity,
    ): Promise<CartProductEntity> {
        await this.productService.findProductById(createCartDto.productId);

        const cartProduct = await this.verifyProductInCart(
            createCartDto.productId,
            cart.id,
        ).catch(async () => undefined);

        const isValidAmount = createCartDto.amount > 0;

        if (!isValidAmount) {
            throw new BadRequestException(
                'the value must be greater than zero',
            );
        }

        if (!cartProduct) {
            return await this.create(createCartDto, cart.id);
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + createCartDto.amount,
        });
    }

    async updateProductInCart(
        updateCartDto: UpdateCartDto,
        cart: CartEntity,
    ): Promise<CartProductEntity> {
        await this.productService.findProductById(updateCartDto.productId);

        const cartProduct = await this.verifyProductInCart(
            updateCartDto.productId,
            cart.id,
        );

        const isValidAmount = updateCartDto.amount > 0;

        if (!isValidAmount) {
            throw new BadRequestException(
                'the value must be greater than zero',
            );
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: updateCartDto.amount,
        });
    }

    async deleteProductFromCart(
        product_id: string,
        cart_id: string,
    ): Promise<DeleteResult> {
        return await this.cartProductRepository.delete({
            product_id,
            cart_id,
        });
    }
}
