import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { CartEntityMock, CreateCart, UpdateCart } from '../__mocks__/cart.mock';
import { returnDeleteMock } from '../../product/__mocks__/product.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CartDataDto } from '../dto/data-cart.dto';

describe('CartController', () => {
    let controller: CartController;
    let cartService: CartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: CartService,
                    useValue: {
                        insertProductInCart: jest
                            .fn()
                            .mockResolvedValue(CartEntityMock),
                        findCartByUserId: jest
                            .fn()
                            .mockResolvedValue(CartEntityMock),
                        clearCart: jest
                            .fn()
                            .mockResolvedValue(returnDeleteMock),
                        updateProductInCart: jest
                            .fn()
                            .mockResolvedValue(CartEntityMock),
                    },
                },
            ],
            controllers: [CartController],
        }).compile();

        controller = module.get<CartController>(CartController);
        cartService = module.get<CartService>(CartService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(cartService).toBeDefined();
    });

    it('should cart Entity in insertProductInCart', async () => {
        const cart = await controller.create(CreateCart, userEntityMock.id);

        expect(cart).toEqual({
            id: CartEntityMock.id,
        });
    });

    it('should cart Entity in findCartByUserId', async () => {
        const CartDataMock = new CartDataDto({
            ...CartEntityMock,
            cartProduct: undefined,
        });

        const cart = await controller.findCartByUserId(userEntityMock.id);

        expect(cart).toEqual(CartDataMock);
    });

    it('should return DeleteResult in clearCart', async () => {
        const cart = await controller.clearCart(userEntityMock.id);

        expect(cart).toEqual(returnDeleteMock);
    });

    it('should cart Entity in updateProductInCart', async () => {
        const cart = await controller.updateProductInCart(
            UpdateCart,
            userEntityMock.id,
        );

        expect(cart).toEqual({
            id: CartEntityMock.id,
        });
    });
});
