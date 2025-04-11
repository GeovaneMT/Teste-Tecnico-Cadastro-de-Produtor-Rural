
import { z } from 'zod'
import { States, UserRole } from '@prisma/client'

import { Roles } from '@/infra/auth/roles.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { EditProducerFarmUseCase } from '@/domain/erm/application/use-cases/edit-producer-farm'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'

const EditProducerFarmBodySchema = z.object({
  producerId: z.string().uuid(),

  name: z.string(),
  city: z.string(),
  state: z.nativeEnum(States),
  
  farmArea: z.number(),
  vegetationArea: z.number(),
  agriculturalArea: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(EditProducerFarmBodySchema)

type EditProducerFarmBodySchema = z.infer<typeof EditProducerFarmBodySchema>

@Controller('producer-farms/:id')
export class EditProducerFarmController {
  constructor(private editProducerFarm: EditProducerFarmUseCase) {}

  @Put()
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProducerFarmBodySchema,
    @Param('id') producerFarmId: string,
  ) {
    const { producerId, name, city, state, farmArea, vegetationArea, agriculturalArea } = body

    const result = await this.editProducerFarm.execute({
      producerId,
      producerFarmId,

      name,
      city,
      state,

      farmArea: farmArea.toString(),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}