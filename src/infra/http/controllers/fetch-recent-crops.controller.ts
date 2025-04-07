import { z } from 'zod'
import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CropPresenter } from '@/infra/http/presenters/crop-presenter'

import { FetchRecentCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-crops'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/crops')
export class FetchRecentCropsController {
  constructor(private fetchRecentCrops: FetchRecentCropsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentCrops.execute({
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

    const crops = result.value.crops

    return { crops: crops.map(CropPresenter.toHTTP) }
  }
}