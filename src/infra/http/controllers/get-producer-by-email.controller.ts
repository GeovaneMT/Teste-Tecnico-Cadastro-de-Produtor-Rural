import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Roles } from '@/infra/auth/roles.decorator'
import { ProducerDetailsPresenter } from '@/infra/http/presenters/producer-details-presenter'

import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

@Controller('/producers/:email')
export class GetProducerByEmailController {
  constructor(private getProducerByEmail: GetProducerByEmailUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle(@Param('email') email: string) {
    const result = await this.getProducerByEmail.execute({
      email,
    })

    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { producer: ProducerDetailsPresenter.toHTTP(result.value.producer) }
  }
}