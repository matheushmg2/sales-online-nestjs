import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDataDto } from './dtos/data.dto';
import { CategoryEntity } from './entities/category.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/create.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAllCategory(): Promise<CategoryDataDto[]> {
        return await this.categoryService.findAllCategory();
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() create: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.create(create);
    }

    @Roles(UserType.Admin)
    @Delete(':categoryId')
    async delete(
        @Param('categoryId') categoryId: string,
    ): Promise<DeleteResult> {
        return this.categoryService.delete(categoryId);
    }
}
