import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { ProductDataDto } from './dtos/data.dto';
import { Roles } from '../decorators/roles.decorator';
import { CreateProductDto } from './dtos/create.dto';
import { UserType } from '../user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dtos/update.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllUser(): Promise<ProductDataDto[]> {
        return (await this.productService.findAllProduct([], true)).map(
            (product) => new ProductDataDto(product),
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() create: CreateProductDto): Promise<ProductEntity> {
        return this.productService.create(create);
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put("/:productId")
    async update(
        @Param('productId') productId: string,
        @Body() update: UpdateProductDto
    ): Promise<ProductEntity> {
        return this.productService.update(update, productId);
    }

	@Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Delete("/:productId")
    async delete(@Param('productId') productId: string): Promise<DeleteResult> {
        return this.productService.delete(productId);
    }
}
