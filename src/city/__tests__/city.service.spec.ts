import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CacheService } from '../../cache/cache.service';
import { cityEntityMock, cityId, stateId } from '../__mocks__/city.mock';

describe('CityService', () => {
    let service: CityService;
    let cityRepository: Repository<CityEntity>;
    let cacheService: CacheService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CityService,
                {
                    provide: getRepositoryToken(CityEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn().mockResolvedValue([cityEntityMock]),
                    },
                },
                {
                    provide: CacheService,
                    useValue: {
                        getCache: jest.fn().mockResolvedValue(cityEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<CityService>(CityService);
        cityRepository = module.get<Repository<CityEntity>>(
            getRepositoryToken(CityEntity),
        );
        cacheService = module.get<CacheService>(CacheService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(cityRepository).toBeDefined();
    });

    describe('getAllCityByStateId', () => {
        it('should throw BadRequestException if stateId is invalid', async () => {
            await expect(
                service.getAllCityByStateId('invalid-uuid'),
            ).rejects.toThrow(BadRequestException);
        });

        it('should return cities from cache if available', async () => {
            jest.spyOn(cacheService, 'getCache').mockResolvedValueOnce([
                cityEntityMock,
            ]);

            const cities = await service.getAllCityByStateId(stateId);

            expect(cities).toEqual([cityEntityMock]);
            expect(cacheService.getCache).toHaveBeenCalledWith(
                `state_${stateId}`,
                expect.any(Function),
            );
        });

        it('should fetch cities from database and cache them if not in cache', async () => {
            jest.spyOn(cacheService, 'getCache').mockImplementationOnce(
                async (key, fetchFunction) => {
                    return fetchFunction();
                },
            );
            jest.spyOn(cityRepository, 'find').mockResolvedValueOnce([
                cityEntityMock,
            ]);

            const cities = await service.getAllCityByStateId(stateId);

            expect(cities).toEqual([cityEntityMock]);
            expect(cityRepository.find).toHaveBeenCalledWith({
                where: { stateId },
            });
            expect(cacheService.getCache).toHaveBeenCalledWith(
                `state_${stateId}`,
                expect.any(Function),
            );
        });
    });

    describe('findCityById', () => {
        it('should throw BadRequestException if cityId is invalid', async () => {
            await expect(service.findCityById('invalid-uuid')).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw NotFoundException if city is not found', async () => {
            jest.spyOn(cityRepository, 'findOne').mockResolvedValueOnce(null);

            await expect(service.findCityById(cityId)).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should return city if found', async () => {
            jest.spyOn(cityRepository, 'findOne').mockResolvedValueOnce(
                cityEntityMock,
            );

            const city = await service.findCityById(cityId);

            expect(city).toEqual(cityEntityMock);
        });
    });
});
