import { CityDataDto } from "../../city/dtos/data.dto";
import { AddressEntity } from "../entities/address.entity";

export class AddressDataDto {
    id: string;
    complement: string;
    number: number;
    cep: string;
    city?: CityDataDto;

    constructor(addressEntity: AddressEntity) {
        this.id = addressEntity.id;
        this.complement = addressEntity.complement;
        this.number = addressEntity.number;
        this.cep = addressEntity.cep;
        this.city = addressEntity.city ? new CityDataDto(addressEntity.city) : undefined;
    }
    
}