import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { tokenPayloadSchema, UserPayload } from './jwt.strategy'

@Injectable()
export class JwtRefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const refToken = request.cookies?.['refresh_token']
    if (!refToken) {
      throw new UnauthorizedException('Missing refresh token')
    }

    const publicKey = Buffer.from(this.config.get('JWT_PUBLIC_KEY'), 'base64')

    const decoded: UserPayload = await this.jwtService.verifyAsync(refToken, { publicKey })
    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired JWT')
    }

    const result = tokenPayloadSchema.safeParse(decoded)

    if (!result.success) {
      console.error('JWT payload validation error:', result.error)
      throw new UnauthorizedException('Malformed JWT payload')
    }

    request.user = result.data
    return true
  }
}
