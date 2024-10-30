import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/create.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async getAllAddress(): Promise<[]> {
        return;
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: string,
    ): Promise<AddressEntity> {
        return this.addressService.create(createAddressDto, userId);
    }
}
