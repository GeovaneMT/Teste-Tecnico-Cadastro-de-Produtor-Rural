import { BadRequestException, NotFoundException, Controller, Get, Param } from '@nestjs/common'
import { CropPresenter } from '@/infra/http/presenters/crop-presenter'
import { GetCropByIdUseCase } from '@/domain/erm/application/use-cases/get-crop-by-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Controller('/crops/:id')
export class GetCropByIdController {
  constructor(private getCropById: GetCropByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getCropById.execute({
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

    return { crop: CropPresenter.toHTTP(result.value.crop) }
  }
}