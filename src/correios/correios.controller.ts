import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CreateCorreioDto } from './dto/create-correio.dto';
import { UpdateCorreioDto } from './dto/update-correio.dto';
import { DataCepDto, DataCepDtoExternal } from './dto/data-correio.dto';

@Controller('correios')
export class CorreiosController {
    constructor(private readonly correiosService: CorreiosService) {}

    @Get('/:cep')
    async findAll(@Param('cep') cep: string) {
        return await this.correiosService.findAdressByCep(cep);
    }

}
