import { CategoryDataDto } from '../../category/dtos/data.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ImageDataDto } from '../../images/dto/data.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductDataDto {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    category: CategoryDataDto;
    image: ImageDataDto;

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.price = productEntity.price;
        this.category = productEntity.categories
            ? new CategoryDataDto(productEntity.categories)
            : undefined;
        this.image = productEntity.images
            ? new ImageDataDto(productEntity.images)
            : undefined;
    }
}
