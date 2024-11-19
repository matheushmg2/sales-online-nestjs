import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductService } from '../cart-product/cart-product.service';
import { isUUID } from 'class-validator';

const LINE_AFFECTED = 1;

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRespository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService,
    ) {}

    async findCartByUserId(
        userId: string,
        isRelations?: boolean,
    ): Promise<CartEntity> {
        const relations = isRelations
            ? {
                  cartProduct: {
                      products: true,
                  },
              }
            : undefined;

        const cart = await this.cartRespository.findOne({
            where: {
                userId,
                active: true,
            },
            relations: relations,
        });

        if (!cart) {
            throw new NotFoundException('Cart active not found');
        }

        return cart;
    }

    async create(userId: string): Promise<CartEntity> {
        return await this.cartRespository.save({
            active: true,
            userId,
        });
    }

    async insertProductInCart(
        createCartDto: CreateCartDto,
        userId: string,
    ): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
            return this.create(userId);
        });

        await this.cartProductService.addProductInCart(createCartDto, cart);

        return cart;
    }

    async updateProductInCart(
        updateCartDto: UpdateCartDto,
        userId: string,
    ): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
            return this.create(userId);
        });

        await this.cartProductService.updateProductInCart(updateCartDto, cart);

        return cart;
    }

    async clearCart(userId: string): Promise<DeleteResult> {
        if (!isUUID(userId)) {
            throw new BadRequestException('User Not Found');
        }

        const cart = await this.findCartByUserId(userId);

        await this.cartRespository.save({
            ...cart,
            active: false,
        });

        return {
            raw: [],
            affected: LINE_AFFECTED,
        };
    }

    async deleteProductCart(
        productId: string,
        userId: string,
    ): Promise<DeleteResult> {
        if (!isUUID(userId)) {
            throw new BadRequestException('User Not Found');
        }

        const cart = await this.findCartByUserId(userId);

        return this.cartProductService.deleteProductFromCart(
            productId,
            cart.id,
        );
    }
}
