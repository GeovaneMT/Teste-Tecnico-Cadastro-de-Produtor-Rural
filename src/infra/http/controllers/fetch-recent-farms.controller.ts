import { z } from 'zod'
import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FarmPresenter } from '@/infra/http/presenters/farm-presenter'

import { FetchRecentFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farms'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/farms')
export class FetchRecentFarmsController {
  constructor(private fetchRecentFarms: FetchRecentFarmsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentFarms.execute({
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

    const farms = result.value.farms

    return { farms: farms.map(FarmPresenter.toHTTP) }
  }
}