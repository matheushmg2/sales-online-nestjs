import { StateEntity } from "../entities/state.entity";

export class StateDataDto {
    name: string;

    constructor(stateEntity: StateEntity) {
        this.name = stateEntity.name;
    }
    
}