import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Roles } from '@/infra/auth/roles.decorator'
import { IndicatorPresenter } from '@/infra/http/presenters/indicators-presenter'

import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'

@Controller('/indicators')
export class GetCropIndicatorsController {
  constructor(private getCropIndicators: GetCropIndicatorsUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle() {
    const result = await this.getCropIndicators.execute()

    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const indicators = result.value.cropsByState

    return { indicators: indicators.map(IndicatorPresenter.toHTTP) }
  }
}