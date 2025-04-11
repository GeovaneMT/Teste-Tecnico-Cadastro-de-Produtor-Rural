import { UserRole } from '@prisma/client'

import { Roles } from '@/infra/auth/roles.decorator'
import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/producers/:id')
export class DeleteProducerController {
  constructor(private deleteProducer: DeleteProducerUseCase) {}

  @Delete()
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async handle(
    @Param('id') producerId: string,
  ) {

    const result = await this.deleteProducer.execute({
      producerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}