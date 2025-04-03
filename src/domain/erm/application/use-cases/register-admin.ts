import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Admin } from '@/domain/erm/enterprise/entities/admin'
import { HashGenerator } from '@/domain/erm/application/cryptography/hash-generator'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { AdminAlreadyExistsError } from '@/domain/erm/application/use-cases/errors/admin-already-exists-error'

interface RegisterAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterAdminUseCaseResponse = Either<
  AdminAlreadyExistsError,
  {
    admin: Admin
  }
>

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    private adminsRepository: AdminsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const adminWithSameEmail = await this.adminsRepository.findByEmail(email)

    if (adminWithSameEmail) {
      return left(new AdminAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const admin = Admin.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.adminsRepository.create(admin)

    return right({
      admin,
    })
  }
}