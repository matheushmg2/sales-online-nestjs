import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/update.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService,
    ) {}

    async findAllProduct(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if (!products || products.length === 0) {
            throw new NotFoundException('Not found products');
        }

        return products;
    }

    async findProductById(id: string): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async create(product: CreateProductDto): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(product.categoryId);

        return this.productRepository.save({
            ...product,
        });
    }

    async update(
        data: UpdateProductDto,
        productId: string,
    ): Promise<ProductEntity> {
        const product = await this.findProductById(productId);

        return this.productRepository.save({
            ...product,
            ...data,
        });
    }

    async delete(id: string): Promise<DeleteResult> {
        const product = await this.findProductById(id);

        return this.productRepository.delete({ id: product.id });
    }
}
