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

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;

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

    async findAllPage(
        search?: string,
        size = DEFAULT_PAGE_SIZE,
        page = FIRST_PAGE,
      ): Promise<Pagination<ProductEntity[]>> {
        const skip = (page - 1) * size;
        let findOptions = {};
        if (search) {
          findOptions = {
            where: {
              name: ILike(`%${search}%`),
            },
          };
        }
        const [products, total] = await this.productRepository.findAndCount({
          ...findOptions,
          take: size,
          skip,
        });
    
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
        if (!isUUID(productId)) {
            throw new BadRequestException('Product Not Found');
        }
        const product = await this.findProductById(productId);

        return this.productRepository.save({
            ...product,
            ...data,
        });
    }

    async delete(id: string): Promise<DeleteResult> {
        if (!isUUID(id)) {
            throw new BadRequestException('Product Not Found');
        }
        const product = await this.findProductById(id);

        return this.productRepository.delete({ id: product.id });
    }
}
