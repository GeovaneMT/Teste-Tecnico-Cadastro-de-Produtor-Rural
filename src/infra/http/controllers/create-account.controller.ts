import { z } from 'zod'

import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/admin/register-admin'
import { AdminAlreadyExistsError } from '@/domain/erm/application/use-cases/admin/errors/admin-already-exists-error'

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
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudent: RegisterAdminUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
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