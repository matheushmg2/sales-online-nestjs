import { CityDataDto } from '../../city/dtos/data.dto';
import { CityEntity } from '../../city/entities/city.entity';
import { Correio } from '../entities/correio.entity';

export class DataCepDtoExternal {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ddd: string;
}

export class DataCepDto {
    postalCode: string;
    publicPlace: string;
    complement: string;
    unit?: string;
    neighborhood: string;
    city: string;
    uf: string;
    ddd: string;
    city_and_state: CityDataDto;

    constructor(
        cep: DataCepDtoExternal,
        city: CityEntity,
        fullContent?: boolean,
    ) {
        this.postalCode = cep.cep;
        this.publicPlace = cep.logradouro;
        this.complement = cep.complemento;
        this.unit = fullContent && cep.unidade;
        this.neighborhood = cep.bairro;
        this.city = cep.localidade;
        this.uf = cep.uf;
        this.ddd = cep.ddd;
        this.city_and_state = fullContent
            ? city
            : cep.localidade
              ? new CityDataDto(city)
              : undefined;
        /*this.city_and_state = cep.localidade
            ? new CityDataDto(city)
            : undefined;*/
    }
}
