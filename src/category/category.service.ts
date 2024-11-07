import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAllCategory(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Category Empty');
        }

        return categories;
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const categories = await this.categoryRepository.findOne({
            where: {
                name
            }
        });

        if (!categories) {
            throw new NotFoundException('Category Empty');
        }

        return categories;
    }

    async create(category: CreateCategoryDto): Promise<CategoryEntity> {

        const categories = await this.findCategoryByName(category.name).catch(() => undefined);

        if (categories) {
            throw new BadRequestException('Category exist');
        }

        return this.categoryRepository.save({
            ...category,
        });
    }
}
