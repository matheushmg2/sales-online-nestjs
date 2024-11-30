import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import {
    categoryEntityMock,
    createCategoryEntityMock,
} from '../__mocks__/category.mock';
import { returnDeleteMock } from '../../product/__mocks__/product.mock';

describe('CategoryController', () => {
    let controller: CategoryController;
    let categoryService: CategoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CategoryService,
                    useValue: {
                        findAllCategory: jest
                            .fn()
                            .mockResolvedValue([createCategoryEntityMock]),
                        create: jest.fn().mockResolvedValue(categoryEntityMock),
                        delete: jest.fn().mockResolvedValue(returnDeleteMock),
                    },
                },
            ],
            controllers: [CategoryController],
        }).compile();

        controller = module.get<CategoryController>(CategoryController);
        categoryService = module.get<CategoryService>(CategoryService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(categoryService).toBeDefined();
    });

    it('should return category Entity in findAllCategories', async () => {
        const category = await controller.findAllCategory();

        expect(category).toEqual([createCategoryEntityMock]);
    });

    it('should return category Entity in createCategory', async () => {
        const category = await controller.create(createCategoryEntityMock);

        expect(category).toEqual(categoryEntityMock);
    });

    it('should return DeleteResult in delete category', async () => {
        const category = await controller.delete(categoryEntityMock.id);

        expect(category).toEqual(returnDeleteMock);
    });
});
