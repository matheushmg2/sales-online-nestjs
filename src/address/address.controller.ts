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
import { AddressDataDto } from './dtos/data.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    @Roles(UserType.User, UserType.Admin)
    @UsePipes(ValidationPipe)
    async create(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: string,
    ): Promise<AddressEntity> {
        return this.addressService.create(createAddressDto, userId);
    }

    @Get()
    @Roles(UserType.User, UserType.Admin)
    async findAddressByUserId(
        @UserId() userId: string,
    ): Promise<AddressDataDto[]> {
        return (await this.addressService.findAddressByUserId(userId)).map(
            (data) => new AddressDataDto(data),
        );
    }
}
