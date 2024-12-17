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
    async findOrderByUserId(@UserId() userId: string) {
        return this.orderService.findOrderByUserId(userId);
    }
}
