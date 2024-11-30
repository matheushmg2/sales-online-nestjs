import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../category/category.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { productEntityMock, returnDeleteMock } from '../__mocks__/product.mock';
import { categoryEntityMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/create.dto';
import { CategoryEntity } from '../../category/entities/category.entity';
import { UpdateProductDto } from '../dtos/update.dto';
import { v4 as uuidv4 } from 'uuid';

describe('ProductService', () => {
    let service: ProductService;
    let productRepository: Repository<ProductEntity>;
    let categoryService: CategoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: CategoryService,
                    useValue: {
                        findCategoryById: jest
                            .fn()
                            .mockResolvedValue(categoryEntityMock),
                    },
                },
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([productEntityMock]),
                        findOne: jest.fn().mockResolvedValue(productEntityMock),
                        save: jest.fn().mockResolvedValue(productEntityMock),
                        delete: jest.fn().mockResolvedValue(returnDeleteMock),
                        findAndCount: jest
                            .fn()
                            .mockResolvedValue([[productEntityMock], 1]),
                    },
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        categoryService = module.get<CategoryService>(CategoryService);
        productRepository = module.get<Repository<ProductEntity>>(
            getRepositoryToken(ProductEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(categoryService).toBeDefined();
        expect(productRepository).toBeDefined();
    });

    describe('findAllProduct', () => {
        it('should return a list of products', async () => {
            jest.spyOn(productRepository, 'find').mockResolvedValue({
                ...productEntityMock,
            } as any);

            const result = await service.findAllProduct();
            expect(result).toEqual(productEntityMock);
            expect(productRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException if no products are found', async () => {
            jest.spyOn(productRepository, 'find').mockResolvedValue([]);

            await expect(service.findAllProduct()).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('findProductById', () => {
        it('should return a product by ID', async () => {
            jest.spyOn(productRepository, 'findOne').mockResolvedValue(
                productEntityMock,
            );

            const result = await service.findProductById(productEntityMock.id);
            expect(result).toEqual(productEntityMock);
            expect(productRepository.findOne).toHaveBeenCalledWith({
                where: { id: productEntityMock.id },
            });
        });

        it('should throw NotFoundException if product is not found', async () => {
            jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

            await expect(service.findProductById(productEntityMock.id)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('create', () => {
        it('should create and return a new product', async () => {
            const categoryEntityMock: CategoryEntity = {
                id: '1',
                name: 'Mock Category',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const createProductDto: CreateProductDto = {
                categoryId: categoryEntityMock.id,
                image: 'mock-image-url',
                name: 'Mock Product',
                price: 25.0,
            };

            const newProduct = {
                id: '1',
                ...createProductDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            jest.spyOn(categoryService, 'findCategoryById').mockResolvedValue(
                categoryEntityMock,
            );

            jest.spyOn(productRepository, 'save').mockResolvedValue(newProduct);

            const result = await service.create(createProductDto);

            expect(result).toEqual(newProduct);
            expect(categoryService.findCategoryById).toHaveBeenCalledWith(
                createProductDto.categoryId,
            );
            expect(productRepository.save).toHaveBeenCalledWith({
                ...createProductDto,
            });
        });
    });

    describe('update', () => {
        it('should update and return the updated product', async () => {
            const productMock: ProductEntity = {
                id: '1',
                name: 'Original Product',
                categoryId: '1',
                price: 100,
                image: 'original-image-url',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const updateProductDto: UpdateProductDto = {
                name: 'Updated Product',
                price: 150,
                image: 'updated-image-url',
                categoryId: '1',
            };

            const updatedProductMock: ProductEntity = {
                ...productMock,
                ...updateProductDto,
                updatedAt: new Date(),
            };

            jest.spyOn(service, 'findProductById').mockResolvedValue(
                productMock,
            );

            jest.spyOn(productRepository, 'save').mockResolvedValue(
                updatedProductMock,
            );

            const result = await service.update(updateProductDto, '1');

            expect(result).toEqual(updatedProductMock);
            expect(service.findProductById).toHaveBeenCalledWith('1');
            expect(productRepository.save).toHaveBeenCalledWith({
                ...productMock,
                ...updateProductDto,
            });
        });

        it('should throw NotFoundException if the product is not found', async () => {
            const updateProductDto: UpdateProductDto = {
                name: 'Updated Product',
                price: 150,
                image: 'updated-image-url',
                categoryId: '1',
            };

            jest.spyOn(service, 'findProductById').mockImplementation(() => {
                throw new NotFoundException('Product not found');
            });

            await expect(service.update(updateProductDto, '1')).rejects.toThrow(
                NotFoundException,
            );

            expect(service.findProductById).toHaveBeenCalledWith('1');

            expect(productRepository.save).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should delete a product by ID', async () => {
            const productMock: ProductEntity = {
                id: '1',
                name: 'Test Product',
                categoryId: '1',
                price: 100,
                image: 'image-url',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const deleteResultMock: DeleteResult = {
                raw: {},
                affected: 1,
            };

            jest.spyOn(service, 'findProductById').mockResolvedValue(
                productMock,
            );
            jest.spyOn(productRepository, 'delete').mockResolvedValue(
                deleteResultMock,
            );

            const result = await service.delete('1');
            expect(result).toEqual(deleteResultMock);
            expect(service.findProductById).toHaveBeenCalledWith('1');
            expect(productRepository.delete).toHaveBeenCalledWith({ id: '1' });
        });
    });
});
