import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'images' })
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'size' })
    size: number;

    @Column({ name: 'key' })
    key: string;

    @Column({ name: 'url' })
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => ProductEntity, (product) => product.images)
    products: ProductEntity[];
}
