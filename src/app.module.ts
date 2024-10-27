import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
<<<<<<< Updated upstream
=======
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
<<<<<<< Updated upstream
    UserModule],
=======
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule],
>>>>>>> Stashed changes
  controllers: [],
  providers: [],
})
export class AppModule { }
