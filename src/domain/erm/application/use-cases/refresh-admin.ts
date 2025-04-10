import { Injectable } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { Either, right } from '@/core/either'
import { EnvService } from '@/infra/env/env.service'
import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'

interface RefreshAdminUseCaseRequest {
  request: ExpressRequest
}

type RefreshAdminUseCaseResponse = Either<
  null,
  {
    accessToken: string
    newRefreshToken: string
  }
>

@Injectable()
export class RefreshAdminUseCase {
  constructor(
    private encrypter: Encrypter,
    private env: EnvService,
  ) {}

  async execute({
    request,
  }: RefreshAdminUseCaseRequest): Promise<RefreshAdminUseCaseResponse> {

    const refreshToken = request.cookies['refresh_token']

    if (!refreshToken) {
      throw new Error('Missing refresh token')
    }

    try {
      const accessToken = await this.encrypter.encrypt({
        sub: request.user,
      })
  
      const refreshTokenExpiresIn = this.env.get('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d'
      const newRefreshToken = await this.encrypter.encrypt({
        sub: request.user,
        expiresIn: refreshTokenExpiresIn,
      })
      
      return right({
        accessToken,
        newRefreshToken,
      })

    } catch (error) {
      throw new Error('Error during token encryption',)
    }
  }
}