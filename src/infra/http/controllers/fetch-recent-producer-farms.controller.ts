import { z } from 'zod'
import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FarmPresenter } from '@/infra/http/presenters/farm-presenter'

import { FetchRecentProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producer-farms'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/produceer-farms')
export class FetchRecentProducerFarmsController {
  constructor(private fetchRecentProducerFarms: FetchRecentProducerFarmsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentProducerFarms.execute({
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

    const producerFarms = result.value.producerFarms

    return { producerFarms: producerFarms.map(FarmPresenter.toHTTP) }
  }
}