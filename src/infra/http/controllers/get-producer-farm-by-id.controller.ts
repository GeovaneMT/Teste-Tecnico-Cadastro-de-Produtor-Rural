import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common'

import { Roles } from '@/infra/auth/roles.decorator'
import { FarmDetailsPresenter } from '@/infra/http/presenters/farm-details-presenter'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { GetProducerFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-producer-farm-by-id'

@Controller('/producer-farms/:id')
export class GetFarmByIdController {
  constructor(private getProducerFarmById: GetProducerFarmByIdUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle(@Param('id') farmId: string) {
    const result = await this.getProducerFarmById.execute({
      farmId,
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

    return { producerFarmDetails: FarmDetailsPresenter.toHTTP(result.value.producerFarmDetails) }
  }
}