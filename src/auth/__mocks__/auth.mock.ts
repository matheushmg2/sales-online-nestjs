import { v4 as uuidv4 } from 'uuid';
import { LoginAuthDto } from '../dtos/login.dto';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AuthDataDto } from '../dtos/data.dto';

export const jwtMock =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZVVzZXIiOjEsImlhdCI6MTY3NTcyNjIzOCwiZXhwIjoxNjc2MzMxMDM4fQ.c438tTJwSIX8Tq-mj_8grpRmLiwt2V-0bZjPuqE49k8';

export const loginUserMock: LoginAuthDto = {
    email: "user@teste.mock",
    password: "abc",
};

export const returnLoginMock: AuthDataDto = {
    accessToken: jwtMock,
    user: userEntityMock,
  };