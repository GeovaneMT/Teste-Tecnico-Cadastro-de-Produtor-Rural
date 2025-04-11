import { UserRole } from '@prisma/client'

import { Roles } from '@/infra/auth/roles.decorator'
import { DeleteProducerFarmUseCase } from '@/domain/erm/application/use-cases/delete-producer-farm'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('producer-farms/:id')
export class DeleteFarmController {
  constructor(private deleteProducerFarm: DeleteProducerFarmUseCase) {}

  @Delete()
  @HttpCode(204)
  @Roles(UserRole.ADMIN)
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