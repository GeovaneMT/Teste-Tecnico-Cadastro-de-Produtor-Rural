import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { EnvService } from '@/infra/env/env.service'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

interface RefreshAdminUseCaseRequest {
  user: UserPayload,
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
    user
  }: RefreshAdminUseCaseRequest): Promise<RefreshAdminUseCaseResponse> {
    
    if(!user) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      role: user.role,
      sub: user.sub,
    })

    const refreshTokenExpiresIn = this.env.get('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d'
    const refreshToken = await this.encrypter.encrypt({
      role: user.role,
      sub: user.sub,
      expiresIn: refreshTokenExpiresIn,
    })

    return right({
      accessToken,
      refreshToken,
    })
  }
}