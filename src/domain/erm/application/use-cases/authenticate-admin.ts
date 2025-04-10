import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { EnvService } from '@/infra/env/env.service'

import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'
import { HashComparer } from '@/domain/erm/application/cryptography/hash-comparer'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/errors/wrong-credentials-error'

interface AuthenticateAdminUseCaseRequest {
  email: string
  password: string
}

type AuthenticateAdminUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    refreshToken: string
  }
>

@Injectable()
export class AuthenticateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
    private env: EnvService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.adminsRepository.findByEmail(email)

    if (!admin) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      admin.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      role: admin.role,
      sub: admin.id.toString(),
    })

    console.log(admin)

    const refreshTokenExpiresIn = this.env.get('JWT_REFRESH_TOKEN_EXPIRES_IN') || '7d'
    const refreshToken = await this.encrypter.encrypt({
      role: admin.role,
      sub: admin.id.toString(),
      expiresIn: refreshTokenExpiresIn,
    })

    return right({
      accessToken,
      refreshToken,
    })
  }
}