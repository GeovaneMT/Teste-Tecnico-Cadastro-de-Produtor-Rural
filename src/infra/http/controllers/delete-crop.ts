import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteCropUseCase } from '@/domain/erm/application/use-cases/delete-crop'

@Controller('producers/:producerId/farms/:farmId/crops/:id')
export class DeleteCropController {
  constructor(private deleteCrop: DeleteCropUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') cropId: string,
  ) {

    const result = await this.deleteCrop.execute({
      cropId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}