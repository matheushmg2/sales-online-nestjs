import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productEntityMock } from '../../product/__mocks__/product.mock';
import { NotFoundException } from '@nestjs/common';
import { CartEntityMock, CreateCart, UpdateCart } from '../../cart/__mocks__/cart.mock';
import { CartProductEntityMock } from '../__mocks__/cart-product..mock';

const returnDeleteMock: DeleteResult = {
    raw: [],
    affected: 1,
};

describe('CartProductService', () => {
    let service: CartProductService;
    let productService: ProductService;
    let cartProductRepository: Repository<CartProductEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        findProductById: jest
                            .fn()
                            .mockResolvedValue(productEntityMock),
                    },
                },
                {
                    provide: getRepositoryToken(CartProductEntity),
                    useValue: {
                        findOne: jest
                            .fn()
                            .mockResolvedValue(CartProductEntityMock),
                        save: jest
                            .fn()
                            .mockResolvedValue(CartProductEntityMock),
                        delete: jest.fn().mockResolvedValue(returnDeleteMock),
                    },
                },
                CartProductService,
            ],
        }).compile();

        service = module.get<CartProductService>(CartProductService);
        productService = module.get<ProductService>(ProductService);
        cartProductRepository = module.get<Repository<CartProductEntity>>(
            getRepositoryToken(CartProductEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(productService).toBeDefined();
        expect(cartProductRepository).toBeDefined();
    });

    describe('delete', () => {
        it('should return delete result after delete product', async () => {
            const deleteResult = await service.deleteProductFromCart(
                productEntityMock.id,
                CartEntityMock.id,
            );

            expect(deleteResult).toEqual(returnDeleteMock);
        });

        it('should return error in exception delete', async () => {
            jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(
                new NotFoundException(),
            );

            expect(
                service.deleteProductFromCart(
                    productEntityMock.id,
                    CartEntityMock.id,
                ),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should return CartProduct after create', async () => {
            const cartProduct = await service.create(
                CreateCart,
                CartEntityMock.id,
            );

            expect(cartProduct).toEqual(CartProductEntityMock);
        });

        it('should return error in exception save', async () => {
            jest.spyOn(cartProductRepository, 'save').mockRejectedValue(
                new NotFoundException(),
            );

            expect(
                service.create(CreateCart, CartEntityMock.id),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('verifyProductInCart', () => {
        it('should return CartProduct if exist', async () => {
            const verifyProduct = await service.verifyProductInCart(
                productEntityMock.id,
                CartEntityMock.id,
            );

            expect(verifyProduct).toEqual(CartProductEntityMock);
        });

        it('should return CartProduct if not exist', async () => {
            jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(
                undefined,
            );

            expect(
                service.verifyProductInCart(
                    productEntityMock.id,
                    CartEntityMock.id,
                ),
            ).rejects.toThrow(NotFoundException);
        });

        it('should return error in exception verify product in cart', async () => {
            jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(
                new NotFoundException(),
            );

            expect(
                service.verifyProductInCart(
                    productEntityMock.id,
                    CartEntityMock.id,
                ),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('addProductInCart', () => {
        it('should return error in exception addProductInCart', async () => {
            jest
              .spyOn(productService, 'findProductById')
              .mockRejectedValue(new NotFoundException());
        
            expect(
              service.addProductInCart(CreateCart, CartEntityMock),
            ).rejects.toThrow(NotFoundException);
          });
        
          it('should return cart product if not exist cart', async () => {
            const spy = jest.spyOn(cartProductRepository, 'save');
            jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
        
            const cartProduct = await service.addProductInCart(
                CreateCart, CartEntityMock
            );
        
            expect(cartProduct).toEqual(CartProductEntityMock);
            expect(spy.mock.calls[0][0].amount).toEqual(CreateCart.amount);
          });
        
          it('should return cart product if not exist cart', async () => {
            const spy = jest.spyOn(cartProductRepository, 'save');
        
            const cartProduct = await service.addProductInCart(
                CreateCart, CartEntityMock
            );
        
            expect(cartProduct).toEqual(CartProductEntityMock);
            expect(spy.mock.calls[0][0]).toEqual({
              ...CartProductEntityMock,
              amount: CartProductEntityMock.amount + CreateCart.amount,
            });
          });
    });

    describe('updateProductInCart', () => {
        it('should return error in exception updateProductInCart', async () => {
            jest
              .spyOn(productService, 'findProductById')
              .mockRejectedValue(new NotFoundException());
        
            expect(
              service.updateProductInCart(UpdateCart, CartEntityMock),
            ).rejects.toThrow(NotFoundException);
          });
        
          it('should return cart product if not exist cart (updateProductInCart)', async () => {
            jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);
        
            expect(
              service.updateProductInCart(UpdateCart, CartEntityMock),
            ).rejects.toThrow(NotFoundException);
          });
        
          it('should return cart product if not exist cart (updateProductInCart)', async () => {
            const spy = jest.spyOn(cartProductRepository, 'save');
        
            const cartProduct = await service.updateProductInCart(
                UpdateCart, CartEntityMock
            );
        
            expect(cartProduct).toEqual(CartProductEntityMock);
            expect(spy.mock.calls[0][0].amount).toEqual(UpdateCart.amount);
          });
    });

    
    
    
      
});
