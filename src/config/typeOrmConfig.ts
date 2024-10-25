import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'; // <- this line is the important

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
};
export const typeOrmConfig = config;