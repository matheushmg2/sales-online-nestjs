import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    categoryEntityMock,
    createCategoryEntityMock,
} from '../__mocks__/category.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
    let service: CategoryService;
    let categoryRepository: Repository<CategoryEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(CategoryEntity),
                    useValue: {
                        findOne: jest
                            .fn()
                            .mockResolvedValue(categoryEntityMock),
                        find: jest.fn().mockResolvedValue([categoryEntityMock]),
                        save: jest.fn().mockResolvedValue(categoryEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<Repository<CategoryEntity>>(
            getRepositoryToken(CategoryEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(categoryRepository).toBeDefined();
    });

    describe('findAllCategory', () => {
        it('should return list category', async () => {
            const category = await service.findAllCategory();

            expect(category).toEqual([categoryEntityMock]);
        });

        it('should return error in list category empty', async () => {
            jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
            expect(service.findAllCategory()).rejects.toThrow(
                NotFoundException,
            );
        });

        it('should return error in list category exception', async () => {
            jest.spyOn(categoryRepository, 'find').mockRejectedValue(
                new NotFoundException(),
            );
            expect(service.findAllCategory()).rejects.toThrow(
                NotFoundException,
            );
        });
    });
    describe('create', () => {
        it('should return category category after save', async () => {
            jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(
                undefined,
            );

            const category = await service.create(createCategoryEntityMock);

            expect(category).toEqual(categoryEntityMock);
        });

        it('should return error if exist in category name', async () => {
            await expect(service.create(categoryEntityMock)).rejects.toThrow(BadRequestException);

        });

        it('should return error in category exception', async () => {
            jest.spyOn(categoryRepository, 'save').mockRejectedValue(
                new BadRequestException(),
            );

            expect(service.create(createCategoryEntityMock)).rejects.toThrow(
                BadRequestException,
            );
        });
    });
    describe('findCategoryByName', () => {
        it('should return category in find by name', async () => {
            const category = await service.findCategoryByName(
                categoryEntityMock.name,
            );

            expect(category).toEqual(categoryEntityMock);
        });

        it('should return error if category find by name empty', async () => {
            jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(
                undefined,
            );
            expect(
                service.findCategoryByName(categoryEntityMock.name),
            ).rejects.toThrow(NotFoundException);
        });
    });
});
