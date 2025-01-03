import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { CartProductEntity } from '../../cart-product/entities/cart-product.entity';
import { OrderProductEntity } from '../../order-product/entities/order-product.entity';
import { ImageEntity } from '../../images/entities/image.entity';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'category_id', nullable: false })
    categoryId: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'price', type: "decimal", nullable: false })
    price: number;

    @Column({ name: 'image_id', nullable: false })
    imageId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => ImageEntity, (image) => image.products)
    @JoinColumn({ name: 'image_id' })
    images?: ImageEntity;

    @ManyToOne(
        () => CategoryEntity,
        (category: CategoryEntity) => category.products,
    )
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    categories?: CategoryEntity;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.products)
    cartProduct?: CartProductEntity[];

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    ordersProduct?: OrderProductEntity[];
}
