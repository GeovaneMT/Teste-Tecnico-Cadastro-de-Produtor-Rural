import { z } from 'zod'
import { States } from '@prisma/client'
import { Post, Body, Controller } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateFarmUseCase } from '@/domain/erm/application/use-cases/create-farm'

const createFarmBodySchema = z.object({
  ownerId: z.string().uuid(),

  name: z.string(),
  city: z.string(),
  state: z.nativeEnum(States),
  farmArea: z.number(),
  vegetationArea: z.number(),
  agriculturalArea: z.number(),

  crops: z.array(z.string().uuid())
})

const bodyValidationPipe = new ZodValidationPipe(createFarmBodySchema)

type CreateFarmBodySchema = z.infer<typeof createFarmBodySchema>

@Controller('/producers/:producerId/farms')
export class CreateFarmController {
  constructor(private createFarm: CreateFarmUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateFarmBodySchema,
  ) {

    const { name, city, state, ownerId, farmArea, vegetationArea, agriculturalArea, crops } = body

    const farm = await this.createFarm.execute({
      ownerId,

      name,
      city,
      state,
      
      farmArea: farmArea.toString(),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),

      cropsIds: crops

    })

    if (farm.isLeft()) {
      throw farm.value
    }

    return { farm: farm.value.farm }
  }
}