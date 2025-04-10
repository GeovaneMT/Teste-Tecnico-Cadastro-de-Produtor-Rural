import { Injectable } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { Either, left, right } from '@/core/either'

import { EnvService } from '@/infra/env/env.service'

import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

interface RefreshAdminUseCaseRequest {
  request: ExpressRequest,
}

type RefreshAdminUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

@Injectable()
export class RefreshAdminUseCase {
  constructor(
    private encrypter: Encrypter,
    private env: EnvService,
  ) {}

  async execute({
    request
  }: RefreshAdminUseCaseRequest): Promise<RefreshAdminUseCaseResponse> {
    
    const doesNotHaveRefreshToken = !request.cookies['refresh_token']

    if (doesNotHaveRefreshToken) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: request.user,
    })

    const refreshTokenExpiresIn = this.env.get('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d'
    const refreshToken = await this.encrypter.encrypt({
      sub: request.user,
      expiresIn: refreshTokenExpiresIn,
    })

    return right({
      accessToken,
      refreshToken,
    })
  }
}