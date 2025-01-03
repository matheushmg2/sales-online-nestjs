import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../user/enum/user-type.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { PayloadDataDto } from '../auth/dtos/payload.dto';
import 'dotenv/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const { authorization } = context.switchToHttp().getRequest().headers;

        const loginPayload: PayloadDataDto | undefined = await this.jwtService
            .verifyAsync(authorization, { secret: process.env.JWT_SECRET })
            .catch(() => undefined);

        if (!loginPayload) {
            throw new UnauthorizedException(
                'Invalid or expired authorization token',
            );
        }

        const hasRole = requiredRoles.some(
            (role) => role === loginPayload.type_user,
        );

        if (!hasRole) {
            throw new ForbiddenException(
                'You do not have the necessary permissions to access this resource',
            );
        }

        return hasRole;
    }
}
