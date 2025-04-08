import { z } from 'zod'
import { States } from '@prisma/client'
import { Post, Body, Controller } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { CreateProducerFarmUseCase } from '@/domain/erm/application/use-cases/create-producer-farm'

const createProducerFarmBodySchema = z.object({
  producerId: z.string().uuid(),

  name: z.string(),
  city: z.string(),
  state: z.nativeEnum(States),
  
  farmArea: z.number(),
  vegetationArea: z.number(),
  agriculturalArea: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(createProducerFarmBodySchema)

type CreateProducerFarmBodySchema = z.infer<typeof createProducerFarmBodySchema>

@Controller('/producer-farms')
export class CreateProducerFarmController {
  constructor(private createProducerFarm: CreateProducerFarmUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateProducerFarmBodySchema,
  ) {

    const { name, city, state, producerId, farmArea, vegetationArea, agriculturalArea } = body

    const producerFarm = await this.createProducerFarm.execute({
      producerId,

      name,
      city,
      state,
      
      farmArea: FarmArea.create({ farmArea, agriculturalArea, vegetationArea }),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),
    })

    if (producerFarm.isLeft()) {
      throw producerFarm.value
    }

    return { producerFarm: producerFarm.value.producerFarm }
  }
}