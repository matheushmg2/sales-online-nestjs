import { ImageEntity } from '../entities/image.entity';

export class ImageDataDto {
    name: string;
    size: number;
    key: string;
    url: string;

    constructor(categoryEntity: ImageEntity) {
        this.name = categoryEntity.name;
        this.size = categoryEntity.size;
        this.key = categoryEntity.key;
        this.url = categoryEntity.url;
    }
}
