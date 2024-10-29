import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { CityEntity } from "../../city/entities/city.entity";

@Entity({ name: 'address' })
export class AddressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id', nullable: false })
    userId: string;

    @Column({ name: 'complement', nullable: true })
    complement: string;

    @Column({ name: 'number', nullable: false })
    number: number;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'city_id', nullable: false })
    cityId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.addresses)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;

    @ManyToOne(() => CityEntity, (city) => city.addresses)
    @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
    city?: CityEntity;

    /*@OneToMany(() => OrderEntity, (order) => order.address)
    orders?: OrderEntity[];*/
}