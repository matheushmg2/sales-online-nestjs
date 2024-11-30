import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { CartProductService } from '../../cart-product/cart-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import {
    productEntityMock,
    returnDeleteMock,
} from '../../product/__mocks__/product.mock';
import { CartEntityMock, CreateCart, UpdateCart } from '../__mocks__/cart.mock';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
    let service: CartService;
    let cartRepository: Repository<CartEntity>;
    let cartProductService: CartProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartService,
                {
                    provide: CartProductService,
                    useValue: {
                        addProductInCart: jest.fn(),
                        deleteProductFromCart: jest
                            .fn()
                            .mockResolvedValue(returnDeleteMock),
                        insertProductInCart: jest
                            .fn()
                            .mockResolvedValue(undefined),
                        deleteProductCart: jest
                            .fn()
                            .mockResolvedValue(returnDeleteMock),
                        updateProductInCart: jest
                            .fn()
                            .mockResolvedValue(undefined),
                    },
                },
                {
                    provide: getRepositoryToken(CartEntity),
                    useValue: {
                        save: jest.fn().mockResolvedValue(CartEntityMock),
                        findOne: jest.fn().mockResolvedValue(CartEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<CartService>(CartService);
        cartProductService = module.get<CartProductService>(CartProductService);
        cartRepository = module.get<Repository<CartEntity>>(
            getRepositoryToken(CartEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(cartProductService).toBeDefined();
        expect(cartRepository).toBeDefined();
    });

    describe('clearCart', () => {
        it('should return delete result if delete cart', async () => {
            const spy = jest.spyOn(cartRepository, 'save');

            const resultDelete = await service.clearCart(userEntityMock.id);

            expect(resultDelete).toEqual(returnDeleteMock);
            expect(spy.mock.calls[0][0]).toEqual({
                ...CartEntityMock,
                active: false,
            });
        });

        it('should return error in findOne undefined', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

            expect(service.clearCart(userEntityMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should return error in findOne undefined', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

            expect(service.clearCart(userEntityMock.id)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });

    describe('findCartByUserId', () => {
        it('should return cart in success (not send relations)', async () => {
            const spy = jest.spyOn(cartRepository, 'findOne');
            const cart = await service.findCartByUserId(userEntityMock.id);

            expect(cart).toEqual(CartEntityMock);
            expect(spy.mock.calls[0][0].relations).toEqual(undefined);
        });

        it('should return cart in success (send relations)', async () => {
            const spy = jest.spyOn(cartRepository, 'findOne');
            const cart = await service.findCartByUserId(
                userEntityMock.id,
                true,
            );

            expect(cart).toEqual(CartEntityMock);
            expect(spy.mock.calls[0][0].relations).toEqual({
                cartProduct: {
                    products: true,
                },
            });
        });

        it('should return notFoundException in not found cart', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

            expect(
                service.findCartByUserId(userEntityMock.id),
            ).rejects.toThrowError(NotFoundException);
        });
    });

    describe('create', () => {
        it('should return send info in save (createCart)', async () => {
            const spy = jest.spyOn(cartRepository, 'save');

            const cart = await service.create(userEntityMock.id);

            expect(cart).toEqual(CartEntityMock);
            expect(spy.mock.calls[0][0]).toEqual({
                active: true,
                userId: userEntityMock.id,
            });
        });
    });

    describe('insertProductInCart', () => {
        it('should return cart when cart is not found (insertProductInCart)', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
            jest.spyOn(cartRepository, 'save').mockResolvedValue(
                CartEntityMock,
            );

            const spyCartProductService = jest
                .spyOn(cartProductService, 'addProductInCart')
                .mockResolvedValue(undefined);

            const cart = await service.insertProductInCart(
                CreateCart,
                userEntityMock.id,
            );

            expect(cart).toEqual(CartEntityMock);
            expect(cartRepository.save).toHaveBeenCalledTimes(1);
            expect(spyCartProductService).toHaveBeenCalledTimes(1);
            expect(spyCartProductService).toHaveBeenCalledWith(
                CreateCart,
                CartEntityMock,
            );
        });

        it('should return cart in cart found (insertProductInCart)', async () => {
            const spy = jest.spyOn(cartRepository, 'save');
            const spyCartProductService = jest.spyOn(
                cartProductService,
                'addProductInCart',
            );

            const cart = await service.insertProductInCart(
                CreateCart,
                userEntityMock.id,
            );

            expect(cart).toEqual(CartEntityMock);
            expect(spy.mock.calls.length).toEqual(0);
            expect(spyCartProductService.mock.calls.length).toEqual(1);
        });
    });

    describe('deleteProductCart', () => {
        it('should return DeleteResult in deleteProductCart', async () => {
            const spy = jest.spyOn(cartProductService, 'deleteProductFromCart');
            const deleteResult = await service.deleteProductCart(
                productEntityMock.id,
                userEntityMock.id,
            );

            expect(deleteResult).toEqual(returnDeleteMock);
            expect(spy.mock.calls.length).toEqual(1);
        });

        it('should return NotFoundException in cart not exist', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
            const spy = jest.spyOn(cartProductService, 'deleteProductFromCart');

            expect(
                service.deleteProductCart(
                    productEntityMock.id,
                    userEntityMock.id,
                ),
            ).rejects.toThrowError(NotFoundException);
            expect(spy.mock.calls.length).toEqual(0);
        });

        it('should return NotFoundException in cart not exist', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);
            const spy = jest.spyOn(cartProductService, 'deleteProductFromCart');

            expect(
                service.deleteProductCart(
                    productEntityMock.id,
                    userEntityMock.id,
                ),
            ).rejects.toThrowError(NotFoundException);
            expect(spy.mock.calls.length).toEqual(0);
        });
    });

    describe('updateProductInCart', () => {
        it('should return cart in updateProductInCart', async () => {
            const spyCartProductService = jest.spyOn(
                cartProductService,
                'updateProductInCart',
            );
            const spySave = jest.spyOn(cartRepository, 'save');
            const cart = await service.updateProductInCart(
                UpdateCart,
                userEntityMock.id,
            );

            expect(cart).toEqual(CartEntityMock);
            expect(spyCartProductService.mock.calls.length).toEqual(1);
            expect(spySave.mock.calls.length).toEqual(0);
        });

        it('should return cart in createCart', async () => {
            jest.spyOn(cartRepository, 'findOne').mockResolvedValue(undefined);

            const spySave = jest.spyOn(cartRepository, 'save');
            const cart = await service.updateProductInCart(
                UpdateCart,
                userEntityMock.id,
            );

            expect(cart).toEqual(CartEntityMock);
            expect(spySave.mock.calls.length).toEqual(1);
        });
    });
});
