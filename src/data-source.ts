import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./user/entities/user.entity";
import { StateEntity } from "./state/entities/state.entity";
import { CityEntity } from "./city/entities/city.entity";
import { AddressEntity } from "./address/entities/address.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'vendas_online',
    synchronize: false,
    logging: true,
    entities: [UserEntity, StateEntity, CityEntity, AddressEntity],
    migrations: ["../src/migration/*.ts"],
    subscribers: [],
});