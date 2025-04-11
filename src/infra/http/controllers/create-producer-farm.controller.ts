import { z } from 'zod'
import { States, UserRole } from '@prisma/client'
import { Post, Body, Controller } from '@nestjs/common'

import { Roles } from '@/infra/auth/roles.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

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
  @Roles(UserRole.ADMIN)
  async handle(
    @Body(bodyValidationPipe) body: CreateProducerFarmBodySchema,
  ) {

    const { name, city, state, producerId, farmArea, vegetationArea, agriculturalArea } = body

    const producerFarm = await this.createProducerFarm.execute({
      producerId,

      name,
      city,
      state,
      
      farmArea: farmArea.toString(),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),
    })

    if (producerFarm.isLeft()) {
      throw producerFarm.value
    }

    return { producerFarm: producerFarm.value.producerFarm }
  }
}