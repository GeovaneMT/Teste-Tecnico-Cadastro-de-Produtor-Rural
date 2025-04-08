
import { z } from 'zod'
import { CropType, States } from '@prisma/client'

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
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

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

      farmArea: FarmArea.create({ farmArea, agriculturalArea, vegetationArea }),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}