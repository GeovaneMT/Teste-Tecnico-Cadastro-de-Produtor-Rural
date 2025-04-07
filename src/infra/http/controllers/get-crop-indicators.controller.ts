
import { BadRequestException, NotFoundException, Controller, Get } from '@nestjs/common'

import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { IndicatorPresenter } from '@/infra/http/presenters/indicators-presenter'

@Controller('/indicators')
export class GetCropIndicatorsController {
  constructor(private getCropIndicators: GetCropIndicatorsUseCase) {}

  @Get()
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