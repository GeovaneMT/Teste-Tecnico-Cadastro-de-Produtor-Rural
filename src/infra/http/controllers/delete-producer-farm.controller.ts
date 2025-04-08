import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteProducerFarmUseCase } from '@/domain/erm/application/use-cases/delete-producer-farm'

@Controller('producer-farms/:id')
export class DeleteFarmController {
  constructor(private deleteProducerFarm: DeleteProducerFarmUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') producerFarmId: string,
  ) {

    const result = await this.deleteProducerFarm.execute({
      producerFarmId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}