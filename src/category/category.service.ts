import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create.dto';
import { isUUID } from 'class-validator';
import { ProductService } from '../product/product.service';
import { CategoryDataDto } from './dtos/data.dto';
import { CountProduct } from '../product/dtos/count-product.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        private readonly productService: ProductService,
    ) {}

    private findAmountCategoryInProducts(
        category: CategoryEntity,
        countList: CountProduct[],
    ): number {
        const count = countList.find(
            (itemCount) => itemCount.category_id === category.id,
        );

        if (count) {
            return count.total;
        }

        return 0;
    }

    async findAllCategory(): Promise<CategoryDataDto[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Category Empty');
        }

        const count = await this.productService.countProductsByCategoryId();

        return categories.map(
            (category) =>
                new CategoryDataDto(
                    category,
                    this.findAmountCategoryInProducts(category, count),
                ),
        );
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const categories = await this.categoryRepository.findOne({
            where: {
                name,
            },
        });

        if (!categories) {
            throw new NotFoundException('Category Empty');
        }

        return categories;
    }

    async findCategoryById(
        id: string,
        isRelations?: boolean,
    ): Promise<CategoryEntity> {
        if (!isUUID(id)) {
            throw new BadRequestException('Category Not Found');
        }

        const relations = isRelations
            ? {
                  products: true,
              }
            : undefined;

        const categories = await this.categoryRepository.findOne({
            where: {
                id,
            },
            relations,
        });

        if (!categories) {
            throw new NotFoundException('Category Empty');
        }

        return categories;
    }

    async create(category: CreateCategoryDto): Promise<CategoryEntity> {
        const categories = await this.findCategoryByName(category.name).catch(
            () => undefined,
        );

        if (categories) {
            throw new BadRequestException('Category exist');
        }

        return this.categoryRepository.save({
            ...category,
        });
    }

    async delete(id: string): Promise<DeleteResult> {
        if (!isUUID(id)) {
            throw new BadRequestException('Category Not Found');
        }

        const category = await this.findCategoryById(id, true);

        if (category.products?.length > 0) {
            throw new BadRequestException('Category with relations.');
        }

        return this.categoryRepository.delete({ id });
    }
}
