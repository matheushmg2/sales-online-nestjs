import { ProductDataDto } from '../../product/dtos/data.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryDataDto {
    id: string;
    name: string;
    amountProducts?: number;
    products?: ProductDataDto[];

    constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
        this.id = categoryEntity.id;
        this.name = categoryEntity.name;
        this.amountProducts = amountProducts;
        this.products = categoryEntity.products
            ? categoryEntity.products.map(
                  (product) => new ProductDataDto(product),
              )
            : undefined;
    }
}
