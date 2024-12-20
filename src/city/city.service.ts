import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { isUUID } from 'class-validator';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) {}

    async getAllCityByStateId(stateId: string): Promise<CityEntity[]> {
        if (!isUUID(stateId)) {
            throw new BadRequestException('stateId Not Found');
        }

        return this.cacheService.getCache<CityEntity[]>(
            `state_${stateId}`,
            () =>
                this.cityRepository.find({
                    where: {
                        stateId,
                    },
                }),
        );
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

        if (!city) {
            throw new NotFoundException('CityId Not Found');
        }

        return city;
    }

    async findCiteByName(
        nameCity: string,
        codeState: string,
    ): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                name: nameCity,
                state: {
                    uf: codeState,
                },
            },
            relations: {
                state: true
            }
        });

        if (!city) {
            throw new NotFoundException('CityId Not Found');
        }

        return city;
    }
}
