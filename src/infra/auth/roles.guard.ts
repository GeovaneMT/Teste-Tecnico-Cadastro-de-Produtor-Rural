
import { Reflector } from '@nestjs/core'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ROLES_KEY } from '@/infra/auth/roles.decorator'

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest<{ user: UserPayload }>()
    const currentUser = request.user

    if (!currentUser || !requiredRoles.includes(currentUser.role)) {
      const request = context.switchToHttp().getRequest()
      const { user: tokenUser  }: { user: UserPayload } = request.cookies?.['refresh_token']

      if (!tokenUser || !requiredRoles.includes(tokenUser.role)) {
        throw new ForbiddenException('You do not have access to this resource')
      }
      
    }

    return true
  }
}
