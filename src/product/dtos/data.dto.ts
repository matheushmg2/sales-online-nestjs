import { CategoryDataDto } from '../../category/dtos/data.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProductDataDto {
    id: string;
    name: string;
    categoryId: string;
    price: number;
    image: string;
    category: CategoryDataDto;

    constructor(productEntity: ProductEntity) {
        this.id = productEntity.id;
        this.name = productEntity.name;
        this.price = productEntity.price;
        this.image = productEntity.image;
        this.category = productEntity.categories
      ? new CategoryDataDto(productEntity.categories)
      : undefined;
    }
}
