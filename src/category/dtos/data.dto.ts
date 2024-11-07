import { CategoryEntity } from "../entities/category.entity";


export class CategoryDataDto {
    id: string;
    name: string;

    constructor(categoryEntity: CategoryEntity) {
        this.id = categoryEntity.id;
        this.name = categoryEntity.name;
    }

}