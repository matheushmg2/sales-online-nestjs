import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/update.dto';
import { isUUID } from 'class-validator';
import { CountProduct } from './dtos/count-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
    ) {}

    async findAllProduct(
        productId?: string[],
        isFindRelations?: boolean,
    ): Promise<ProductEntity[]> {
        if (productId) {
            const invalidIds = productId.filter((id) => !isUUID(id));
            if (invalidIds.length > 0) {
                throw new BadRequestException(
                    `Invalid UUIDs Not found products`,
                );
            }
        }

        let findOptions = {};

        if (productId && productId.length > 0) {
            findOptions = {
                where: {
                    id: In(productId),
                },
            };
        }

        if (isFindRelations) {
            findOptions = {
                ...findOptions,
                relations: {
                    categories: true,
                },
            };
        }

        const products = await this.productRepository.find(findOptions);

        if (!products || products.length === 0) {
            throw new NotFoundException('Not found products');
        }

        return products;
    }

    async findProductById(id: string): Promise<ProductEntity> {
        if (!isUUID(id)) {
            throw new BadRequestException('Product Not Found');
        }

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

    async countProductsByCategoryId(): Promise<CountProduct[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .select('product.category_id, COUNT(*) as total')
            .groupBy('product.category_id')
            .getRawMany();
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
