import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Roles } from '@/infra/auth/roles.decorator'
import { FarmPresenter } from '@/infra/http/presenters/farm-presenter'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { FetchRecentProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producer-farms'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/producer-farms')
export class FetchRecentProducerFarmsController {
  constructor(private fetchRecentProducerFarms: FetchRecentProducerFarmsUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
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