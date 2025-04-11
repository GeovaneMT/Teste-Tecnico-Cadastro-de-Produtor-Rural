import { z } from 'zod'
import { Response as ExpressResponse, Request as ExpressRequest } from 'express'

import { Public } from '@/infra/auth/public'
import { RefreshAdminUseCase } from '@/domain/erm/application/use-cases/refresh-admin'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

import {
  Res,
  Body,
  Controller,
  BadRequestException,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
  Headers,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Public()
@Controller('/token/refresh')
export class RefreshController {
  constructor(
    private jwtService: JwtService,
    private refreshAdmin: RefreshAdminUseCase
  ) {}

  @Patch()
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Req() request: ExpressRequest,
  ) {
    const refToken = request.cookies?.['refresh_token']

    if (!refToken) {
      console.log(' refToken', refToken)
      throw new UnauthorizedException('refToken missing')
    }
    
    const decodedToken = this.jwtService.decode(refToken) as UserPayload
    
    const user: UserPayload = {
      sub: decodedToken.sub,
      role: decodedToken.role,
    }

    console.log(' user', user)

    if (!body) {
      throw new BadRequestException()
    }

    const result = await this.refreshAdmin.execute({
      user
    })


    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken, refreshToken } = result.value

    response.cookie('refresh_token', refreshToken, {
      path: '/',
      secure: false,
      sameSite: true,
      httpOnly: true,
    })

    return {
      access_token: accessToken,
    }
  }
}