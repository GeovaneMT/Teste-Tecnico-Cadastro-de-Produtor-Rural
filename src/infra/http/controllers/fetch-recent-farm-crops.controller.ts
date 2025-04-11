import { z } from 'zod'
import { UserRole } from '@prisma/client'

import { BadRequestException, NotFoundException, Controller, Get, Query } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Roles } from '@/infra/auth/roles.decorator'
import { CropPresenter } from '@/infra/http/presenters/farm-crop-presenter'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

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
  @Roles(UserRole.ADMIN)
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