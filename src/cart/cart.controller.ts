import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserId } from '../decorators/user-id.decorator';
import { CartDataDto } from './dto/data-cart.dto';
import { DeleteResult } from 'typeorm';
import { CartEntity } from './entities/cart.entity';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async create(
        @Body() createCartDto: CreateCartDto,
        @UserId() userId: string,
    ): Promise<CartDataDto> {
        return new CartDataDto(
            await this.cartService.insertProductInCart(createCartDto, userId),
        );
    }

    @Get()
    async findCartByUserId(@UserId() userId: string): Promise<CartDataDto> {
        return new CartDataDto(
            await this.cartService.findCartByUserId(userId, true),
        );
    }

    @UsePipes(ValidationPipe)
    @Patch()
    async updateProductInCart(
        @Body() updateCartDto: UpdateCartDto,
        @UserId() userId: string,
    ): Promise<CartDataDto> {
        return new CartDataDto(
            await this.cartService.updateProductInCart(updateCartDto, userId),
        );
    }

    @Delete()
    async clearCart(@UserId() userId: string): Promise<DeleteResult> {
        return await this.cartService.clearCart(userId);
    }

    @Delete('/product/:productId')
    async deleteProductCart(
        @Param('productId') productId: string,
        @UserId() userId: string,
    ): Promise<DeleteResult> {
        return await this.cartService.deleteProductCart(productId, userId);
    }
}
