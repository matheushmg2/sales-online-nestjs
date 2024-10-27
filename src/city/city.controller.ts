import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) {

    }

    @Get('/:stateId')
    async getAllUser(@Param('stateId') stateId: string): Promise<CityEntity[]> {
        return this.cityService.getAllCityByStateId(stateId);
    }
}
