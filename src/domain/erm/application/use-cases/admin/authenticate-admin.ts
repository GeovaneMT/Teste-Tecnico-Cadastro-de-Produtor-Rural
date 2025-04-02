import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Encrypter } from '@/domain/erm/application/cryptography/encrypter'
import { HashComparer } from '@/domain/erm/application/cryptography/hash-comparer'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { WrongCredentialsError } from '@/domain/erm/application/use-cases/core-errors/wrong-credentials-error'

interface AuthenticateAdminUseCaseRequest {
  email: string
  password: string
}

type AuthenticateAdminUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
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
      sub: admin.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}