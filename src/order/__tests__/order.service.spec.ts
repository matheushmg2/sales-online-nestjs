import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartService } from '../../cart/cart.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { PaymentService } from '../../payment/payment.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../order.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { CartEntityMock } from '../../cart/__mocks__/cart.mock';
import { CartProductEntityMock } from '../../cart-product/__mocks__/cart-product..mock';
import { productEntityMock } from '../../product/__mocks__/product.mock';
import { paymentEntityMock } from '../../payment/__mocks__/payment.mock';
import { orderProductEntityMock } from '../../order-product/__mocks__/order-product.mock';
import { orderEntityMock } from '../__mocks__/order.mock';
import { createOrderPixMock } from '../__mocks__/create-order.mock';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('OrderService', () => {
    let service: OrderService;
    let orderRepositoty: Repository<OrderEntity>;
    let paymentService: PaymentService;
    let cartService: CartService;
    let orderProductService: OrderProductService;
    let productService: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                {
                    provide: PaymentService,
                    useValue: {
                        createPayment: jest
                            .fn()
                            .mockResolvedValue(paymentEntityMock),
                    },
                },
                {
                    provide: CartService,
                    useValue: {
                        findCartByUserId: jest.fn().mockResolvedValue({
                            ...CartEntityMock,
                            cartProduct: [CartProductEntityMock],
                        }),
                        clearCart: jest.fn(),
                    },
                },
                {
                    provide: OrderProductService,
                    useValue: {
                        createOrderProduct: jest
                            .fn()
                            .mockResolvedValue(orderProductEntityMock),
                        findAmountProductsByOrderId: jest
                            .fn()
                            .mockResolvedValue([]),
                    },
                },
                {
                    provide: ProductService,
                    useValue: {
                        findAllProduct: jest
                            .fn()
                            .mockResolvedValue([productEntityMock]),
                    },
                },
                {
                    provide: getRepositoryToken(OrderEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([orderEntityMock]),
                        save: jest.fn().mockResolvedValue(orderEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<OrderService>(OrderService);
        paymentService = module.get<PaymentService>(PaymentService);
        cartService = module.get<CartService>(CartService);
        orderProductService =
            module.get<OrderProductService>(OrderProductService);
        productService = module.get<ProductService>(ProductService);
        orderRepositoty = module.get<Repository<OrderEntity>>(
            getRepositoryToken(OrderEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(orderRepositoty).toBeDefined();
        expect(cartService).toBeDefined();
        expect(paymentService).toBeDefined();
        expect(orderProductService).toBeDefined();
        expect(productService).toBeDefined();
    });

    it('should return orders in findOrdersByUserId', async () => {
        const spy = jest.spyOn(orderRepositoty, 'find');
        const orders = await service.findOrderByUserId(userEntityMock.id);

        expect(orders).toEqual([orderEntityMock]);
        expect(spy.mock.calls[0][0]).toEqual({
            where: {
                userId: userEntityMock.id,
                id: undefined,
            },
            relations: {
                address: true,
                ordersProduct: {
                    product: true,
                },
                payment: {
                    paymentStatus: true,
                },
            },
        });
    });

    it('should return NotFoundException in find return empty', async () => {
        jest.spyOn(orderRepositoty, 'find').mockResolvedValue([]);

        expect(
            service.findOrderByUserId(userEntityMock.id),
        ).rejects.toThrowError(NotFoundException);
    });

    it('should call createOrderProduct amount cartProduct in cart', async () => {
        const spyOrderProduct = jest.spyOn(
            orderProductService,
            'createOrderProduct',
        );

        const createOrderProductUsingCart =
            await service.createOrderProductUsingCart(
                {
                    ...CartEntityMock,
                    cartProduct: [CartProductEntityMock, CartProductEntityMock],
                },
                orderEntityMock.id,
                [productEntityMock],
            );

        expect(createOrderProductUsingCart).toEqual([
            orderProductEntityMock,
            orderProductEntityMock,
        ]);
        expect(spyOrderProduct.mock.calls.length).toEqual(2);
    });

    it('should return order in saveOrder', async () => {
        const spy = jest.spyOn(orderRepositoty, 'save');

        const order = await service.saveOrder(
            userEntityMock.id,
            createOrderPixMock,
            paymentEntityMock,
        );

        expect(order).toEqual(orderEntityMock);
        expect(spy.mock.calls[0][0]).toEqual({
            addressId: createOrderPixMock.addressId,
            date: new Date(),
            paymentId: paymentEntityMock.id,
            userId: userEntityMock.id,
        });
    });

    it('should expection in error save', async () => {
        jest.spyOn(orderRepositoty, 'save').mockRejectedValue(new Error());

        expect(
            service.saveOrder(
                userEntityMock.id,
                createOrderPixMock,
                paymentEntityMock,
            ),
        ).rejects.toThrowError();
    });

    it('should return order in create order success', async () => {
        const spyCartService = jest.spyOn(cartService, 'findCartByUserId');
        const spyProductService = jest.spyOn(productService, 'findAllProduct');
        const spyCartServiceClear = jest.spyOn(cartService, 'clearCart');
        const spyOrderProductService = jest.spyOn(
            orderProductService,
            'createOrderProduct',
        );
        const spyPaymentService = jest.spyOn(paymentService, 'createPayment');
        const spySave = jest.spyOn(orderRepositoty, 'save');

        const order = await service.create(
            createOrderPixMock,
            userEntityMock.id,
        );

        expect(order).toEqual(orderEntityMock);
        expect(spyCartService.mock.calls.length).toEqual(1);
        expect(spyProductService.mock.calls.length).toEqual(1);
        expect(spyPaymentService.mock.calls.length).toEqual(1);
        expect(spySave.mock.calls.length).toEqual(1);
        expect(spyOrderProductService.mock.calls.length).toEqual(1);
        expect(spyCartServiceClear.mock.calls.length).toEqual(1);
    });

    /*it('should return orders', async () => {
    const spy = jest.spyOn(orderRepositoty, 'find');
    const orders = await service.findAllOrders();

    expect(orders).toEqual([orderEntityMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        user: true,
      },
    });
  });

  it('should error in not found', async () => {
    jest.spyOn(orderRepositoty, 'find').mockResolvedValue([]);

    expect(service.findAllOrders()).rejects.toThrowError(
      new NotFoundException('Orders not found'),
    );
  });*/
});
