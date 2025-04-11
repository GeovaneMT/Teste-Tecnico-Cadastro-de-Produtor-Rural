import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { Roles } from '@/infra/auth/roles.decorator'

import { Public } from '@/infra/auth/public.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { AdminAlreadyExistsError } from '@/domain/erm/application/use-cases/errors/admin-already-exists-error'

import {
  Post,
  Body,
  UsePipes,
  HttpCode,
  Controller,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'

const createAccountBodySchema = z.object({
  role: z.nativeEnum(UserRole).optional().nullable(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerAdmin: RegisterAdminUseCase) {}

  @Post()
  @HttpCode(201)
  @Roles(UserRole.ADMIN)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { role, name, email, password } = body

    const result = await this.registerAdmin.execute({
      role: role? role : UserRole.ADMIN,
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdminAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}