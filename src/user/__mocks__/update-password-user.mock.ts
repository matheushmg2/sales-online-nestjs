import { UpdatePasswordUserDto } from '../dtos/update-password.dto';

export const updatePasswordUserMock: UpdatePasswordUserDto = {
    newPassword: '1234',
    lastPassword: 'abc',
};

export const updatePasswordUserInvalidMock: UpdatePasswordUserDto = {
    newPassword: '1234',
    lastPassword: '4321',
};
