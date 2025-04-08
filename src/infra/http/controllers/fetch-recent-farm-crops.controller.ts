import { z } from 'zod'

import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { CropPresenter } from '@/infra/http/presenters/farm-crop-presenter'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FetchRecentFarmCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farm-crops'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/farm-crops')
export class FetchRecentFarmCropsController {
  constructor(private fetchRecentFarmCropsUseCase: FetchRecentFarmCropsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentFarmCropsUseCase.execute({
      page,
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

    const farmCrops = result.value.farmCrops

    return { farmCrops: farmCrops.map(CropPresenter.toHTTP) }
  }
}