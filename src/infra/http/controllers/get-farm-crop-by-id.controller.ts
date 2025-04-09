import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common'
import { CropPresenter } from '@/infra/http/presenters/farm-crop-presenter'
import { GetFarmCropByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-crop-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Controller('/farm-crops/:id')
export class GetCropByIdController {
  constructor(private getFarmCropById: GetFarmCropByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getFarmCropById.execute({
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

    return { farmCrop: CropPresenter.toHTTP(result.value.farmCrop) }
  }
}