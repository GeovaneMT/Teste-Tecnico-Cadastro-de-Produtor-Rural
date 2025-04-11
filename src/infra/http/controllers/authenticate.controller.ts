import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { Response as ExpressResponse } from 'express'

import { Roles } from '@/infra/auth/roles.decorator'
import { Public } from '@/infra/auth/public.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

import {
  Res,
  Body,
  Post,
  UsePipes,
  Controller,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'


const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(private authenticateAdmin: AuthenticateAdminUseCase) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema, @Res({ passthrough: true }) response: ExpressResponse) {
    const { email, password } = body

    const result = await this.authenticateAdmin.execute({
      email,
      password,
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