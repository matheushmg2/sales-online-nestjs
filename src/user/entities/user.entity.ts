import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "../../address/entities/address.entity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'cpf', nullable: false })
    cpf: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'type_user', nullable: false })
    type_user: number;

    @Column({ name: 'created_at', nullable: false })
    created_at: Date;

    @Column({ name: 'updated_at', nullable: false })
    updated_at: Date;

    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses?: AddressEntity[];
}