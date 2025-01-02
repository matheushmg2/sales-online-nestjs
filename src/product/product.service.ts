import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/update.dto';
import { isUUID } from 'class-validator';
import { CountProduct } from './dtos/count-product.dto';
import { Pagination, PaginationMeta } from '../pagination/pagination.dto';
import { ImagesService } from '../images/images.service';
import { Request } from 'express';
import { ProductDataDto } from './dtos/data.dto';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,

        private readonly imagesService: ImagesService,
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
                    images: true,
                },
            };
        }

        const products = await this.productRepository.find(findOptions);

        if (!products || products.length === 0) {
            throw new NotFoundException('Not found products');
        }

        return products;
    }

    async findAllPage(
        search?: string,
        size = DEFAULT_PAGE_SIZE,
        page = FIRST_PAGE,
    ): Promise<Pagination<ProductDataDto[]>> {
        const skip = (page - 1) * size;
        let findOptions = {};
        if (search) {
            findOptions = {
                where: {
                    name: ILike(`%${search}%`),
                },
            };
        }
        const [product, total] = await this.productRepository.findAndCount({
            ...findOptions,
            take: size,
            skip,
            relations: ['images', 'categories'],
        });

        const products = product.map((data) => new ProductDataDto(data));

        return new Pagination(
            new PaginationMeta(
                Number(size),
                total,
                Number(page),
                Math.ceil(total / size),
            ),
            products,
        );
    }

    async findProductById(
        id: string,
        isRelactions?: boolean,
    ): Promise<ProductEntity> {
        if (!isUUID(id)) {
            throw new BadRequestException('Product Not Found');
        }

        const relations = isRelactions
            ? {
                  categories: true,
                  images: true,
              }
            : undefined;

        const product = await this.productRepository.findOne({
            where: {
                id,
            },
            relations,
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

    async create(req: Request): Promise<ProductEntity> {
        const { file, body } = await this.imagesService.handleFileUploadAll(
            req,
            'Product',
        );

        const image = await this.imagesService.create(file);

        const { categoryId, name, price } = body;

        const newProduct = {
            categoryId,
            name,
            price: Number(price),
            imageId: image.id,
        };

        return this.productRepository.save({
            ...newProduct,
        });
    }

    async update(
        data: UpdateProductDto,
        productId: string,
    ): Promise<ProductEntity> {
        if (!isUUID(productId)) {
            throw new BadRequestException('Product Not Found');
        }
        const product = await this.findProductById(productId);

        const newProduct = {
            categoryId: data.categoryId,
            name: data.name,
            price: Number(data.price),
            imageId: product.imageId,
        };

        return this.productRepository.save({
            ...product,
            ...newProduct,
        });
    }

    async delete(id: string): Promise<any> {
        if (!isUUID(id)) {
            throw new BadRequestException('Product Not Found');
        }
        const { imageId } = await this.findProductById(id);

        await this.imagesService.findImageById(imageId);

        return {
            statusCode: 200,
            message: 'Product removed successfully',
        };
    }
}
