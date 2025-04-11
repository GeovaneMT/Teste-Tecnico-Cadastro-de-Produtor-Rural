import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { Response as ExpressResponse } from 'express'

import { Roles } from '@/infra/auth/roles.decorator'
import { Public } from '@/infra/auth/public.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'

import { RefreshAdminUseCase } from '@/domain/erm/application/use-cases/refresh-admin'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

import {
  Res,
  Body,
  Patch,
  Controller,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { JwtRefreshTokenGuard } from '@/infra/auth/jwt-refresh.guard'


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
  @Roles(UserRole.ADMIN)

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