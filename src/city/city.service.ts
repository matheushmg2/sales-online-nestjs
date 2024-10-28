import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { isUUID } from 'class-validator';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache

    ) { }

    async getAllCityByStateId(stateId: string): Promise<CityEntity[]> {
        const citiesCache: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);

        // Se existe cidades em cache
        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                stateId,
            }
        });

        await this.cacheManager.set(`state_${stateId}`, cities);

        return cities;
    }

    async findCityById(cityId: string): Promise<CityEntity> {

        if (!isUUID(cityId)) {
            throw new BadRequestException('CityId Not Found');
        }

        const city = await this.cityRepository.findOne({
            where: {
                id: cityId,
            },
        });

        if(!city) {
            throw new NotFoundException('CityId Not Found');
        }

        return city;
    }
}
