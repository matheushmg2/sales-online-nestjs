//import { StateDataDto } from "../../state/dtos/data.dto";
import { StateDataDto } from "../../state/dtos/data.dto";
import { CityEntity } from "../entities/city.entity";

export class CityDataDto {
    name: string;
    state?: StateDataDto;


    constructor(cityEntity: CityEntity) {
        this.name = cityEntity.name;
        this.state = cityEntity.state ? new StateDataDto(cityEntity.state) : undefined;
    }

}