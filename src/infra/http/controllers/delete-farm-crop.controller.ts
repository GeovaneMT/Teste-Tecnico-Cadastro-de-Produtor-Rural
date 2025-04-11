import { UserRole } from '@prisma/client'

import { Roles } from '@/infra/auth/roles.decorator'
import { DeleteFarmCropUseCase } from '@/domain/erm/application/use-cases/delete-farm-crop'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('farm-crops/:id')
export class DeleteFarmCropController {
  constructor(private deleteFarmCrop: DeleteFarmCropUseCase) {}

  @Delete()
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
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