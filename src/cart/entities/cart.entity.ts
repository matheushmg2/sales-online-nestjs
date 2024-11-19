import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { CartProductEntity } from "../../cart-product/entities/cart-product.entity";

@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @Column({ name: 'active', nullable: false })
    active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;

    @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.carts)
    cartProduct?: CartProductEntity[];

}
