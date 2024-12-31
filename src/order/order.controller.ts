import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserId } from '../decorators/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { OrderDataDto } from './dto/data.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDTO: CreateOrderDto,
        @UserId() userId: string,
    ): Promise<OrderEntity> {
        return this.orderService.create(createOrderDTO, userId);
    }

    @Get()
    async findOrderByUserId(@UserId() userId: string): Promise<OrderEntity[]> {
        return this.orderService.findOrderByUserId(userId);
    }

    @Roles(UserType.Admin, UserType.Root)
    @Get('/all')
    async findAllOrder(): Promise<OrderDataDto[]> {
        return (await this.orderService.findAllOrders()).map(
            (order) => new OrderDataDto(order),
        );
    }

    @Roles(UserType.Admin, UserType.Root)
    @Get('/:orderId')
    async findOrderById(
        @Param('orderId') orderId: string,
    ): Promise<OrderDataDto> {
        return new OrderDataDto(
            (await this.orderService.findOrderByUserId(undefined, orderId))[0],
        );
    }
}
