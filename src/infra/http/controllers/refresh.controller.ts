import { z } from 'zod'
import { Response as ExpressResponse, Request as ExpressRequest } from 'express'

import { Public } from '@/infra/auth/public'
import { RefreshAdminUseCase } from '@/domain/erm/application/use-cases/refresh-admin'

import {
  Res,
  Body,
  Controller,
  BadRequestException,
  Patch,
  Req,
} from '@nestjs/common'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/token/refresh')
@Public()
export class RefreshController {
  constructor(private refreshAdmin: RefreshAdminUseCase) {}

  @Patch()
  async handle(
    @Body() body: AuthenticateBodySchema,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Req() request: ExpressRequest
  ) {

    if (!body) {
      throw new BadRequestException()
    }   

    const result = await this.refreshAdmin.execute({
      request
    })

    if (result.isLeft() || !result.value) {
      console.log(result.value)
      throw new BadRequestException(result.value)
    }

    const { accessToken, newRefreshToken } = result.value

    response.cookie('refresh_token', newRefreshToken, {
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