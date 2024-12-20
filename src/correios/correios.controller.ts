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

    @Post()
    create(@Body() createCorreioDto: CreateCorreioDto) {
        return this.correiosService.create(createCorreioDto);
    }

    @Get('/:cep')
    async findAll(@Param('cep') cep: string) {
        return await this.correiosService.findAdressByCep(cep);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.correiosService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCorreioDto: UpdateCorreioDto,
    ) {
        return this.correiosService.update(+id, updateCorreioDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.correiosService.remove(+id);
    }
}
