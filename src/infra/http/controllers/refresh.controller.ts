import { z } from 'zod'
import { Response as ExpressResponse } from 'express'

import { Public } from '@/infra/auth/public'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtRefreshTokenGuard } from '@/infra/auth/jwt-refresh.guard'

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
} from '@nestjs/common'


const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Public()
@Controller('/token/refresh')
@UseGuards(JwtRefreshTokenGuard)

export class RefreshController {
  constructor(
    private refreshAdmin: RefreshAdminUseCase
  ) {}

  @Patch()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {

    if(!body) {
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