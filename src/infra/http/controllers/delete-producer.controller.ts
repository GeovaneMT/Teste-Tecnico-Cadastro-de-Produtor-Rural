import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

@Controller('/producers/:id')
export class DeleteProducerController {
  constructor(private deleteProducer: DeleteProducerUseCase) {}

  @Delete()
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