import {
    BadRequestException,
    HttpException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCorreioDto } from './dto/create-correio.dto';
import { UpdateCorreioDto } from './dto/update-correio.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import 'dotenv/config';
import { DataCepDto, DataCepDtoExternal } from './dto/data-correio.dto';
import { CityService } from '../city/city.service';
import { CityEntity } from '../city/entities/city.entity';
import { CityDataDto } from '../city/dtos/data.dto';

const url_correio = process.env.URL_CORREIO;

@Injectable()
export class CorreiosService {
    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService,
    ) {}

    async findAdressByCep(cep: string): Promise<any> {
        const cepRegex = /^[0-9]{8}$/;
        if (!cepRegex.test(cep)) {
            throw new NotFoundException('CEP inválido.');
        }

        const response = this.httpService.axiosRef.get(
            url_correio.replace('{CEP}', cep),
        );

        if ((await response).data.erro) {
            throw new BadRequestException('Postal code not found.');
        }

        const returnCep: DataCepDtoExternal = await response
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(
                    `Error in connection request ${error.message}`,
                );
            });

        const city = await this.cityService.findCiteByName(returnCep.localidade, returnCep.uf).catch(() => undefined)

        return new DataCepDto(returnCep, city);
    }
}
