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
import { CategoryService } from './category.service';
import { CategoryDataDto } from './dtos/data.dto';
import { CategoryEntity } from './entities/category.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/create.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAllCategory(): Promise<CategoryDataDto[]> {
        return await this.categoryService.findAllCategory();
    }

    @Get('/:categoryId')
    async findCategoryById(
        @Param('categoryId') categoryId: string,
    ): Promise<CategoryDataDto> {
        return new CategoryDataDto(
            await this.categoryService.findCategoryById(categoryId, true),
        );
    }

    @Roles(UserType.Admin, UserType.Root)
    @UsePipes(ValidationPipe)
    @Post()
    async create(@Body() create: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.create(create);
    }

    @Roles(UserType.Admin, UserType.Root)
    @UsePipes(ValidationPipe)
    @Put('/:categoryId')
    async editCategory(
        @Param('categoryId') categoryId: string,
        @Body() updateCategory: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
        return this.categoryService.editCategory(categoryId, updateCategory);
    }

    @Roles(UserType.Admin, UserType.Root)
    @Delete('/:categoryId')
    async delete(
        @Param('categoryId') categoryId: string,
    ): Promise<DeleteResult> {
        return this.categoryService.delete(categoryId);
    }
}
