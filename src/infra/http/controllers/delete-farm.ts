import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteFarmUseCase } from '@/domain/erm/application/use-cases/delete-farm'

@Controller('producers/:producerId/farms/:id')
export class DeleteFarmController {
  constructor(private deleteFarm: DeleteFarmUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') farmId: string,
  ) {

    const result = await this.deleteFarm.execute({
      farmId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}