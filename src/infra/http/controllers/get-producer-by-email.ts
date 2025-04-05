import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ProducerDetailsPresenter } from '@/infra/http/presenters/producer-details-presenter'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

@Controller('/producers/:email')
export class GetProducerByEmailController {
  constructor(private getProducerByEmail: GetProducerByEmailUseCase) {}

  @Get()
  async handle(@Param('email') email: string) {
    const result = await this.getProducerByEmail.execute({
      email,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { producer: ProducerDetailsPresenter.toHTTP(result.value.producer) }
  }
}