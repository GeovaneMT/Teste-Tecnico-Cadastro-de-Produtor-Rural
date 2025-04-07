import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common'
import { FarmDetailsPresenter } from '@/infra/http/presenters/farm-details-presenter'
import { GetFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Controller('/farms/:id')
export class GetFarmByIdController {
  constructor(private getFarmById: GetFarmByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getFarmById.execute({
      id,
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

    return { farm: FarmDetailsPresenter.toHTTP(result.value.farm) }
  }
}