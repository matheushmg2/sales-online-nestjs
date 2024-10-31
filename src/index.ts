import { AppDataSource } from './data-source';
//import { UserDto } from "./entity/user.dto"

AppDataSource.initialize()
    .then(async () => {})
    .catch((error) => console.log(error));
