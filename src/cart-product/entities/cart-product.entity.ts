import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { CartEntity } from "../../cart/entities/cart.entity";

@Entity({ name: 'cart_product' })
export class CartProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'cart_id', nullable: false })
    cart_id: string;

    @Column({ name: 'product_id', nullable: false })
    product_id: string;

    @Column({ name: 'amount', nullable: false })
    amount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CartEntity, (cart) => cart.cartProduct)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    carts?: CartEntity;

    @ManyToOne(() => ProductEntity, (product) => product.cartProduct)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    products?: ProductEntity;

}