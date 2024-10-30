import { PayloadDataDto } from '../auth/dtos/payload.dto';

export const authorizantionToLoginPayload = (
    authorization: string,
): PayloadDataDto | undefined => {
    const authorizationSplited = authorization.split('.');

    if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
        return undefined;
    }

    return JSON.parse(
        Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
    );
};
