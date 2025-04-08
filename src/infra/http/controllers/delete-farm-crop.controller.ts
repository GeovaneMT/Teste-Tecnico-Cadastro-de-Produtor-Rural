import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteFarmCropUseCase } from '@/domain/erm/application/use-cases/delete-farm-crop'

@Controller('farm-crops/:id')
export class DeleteFarmCropController {
  constructor(private deleteFarmCrop: DeleteFarmCropUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') farmCropId: string,
  ) {

    const result = await this.deleteFarmCrop.execute({
      farmCropId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}