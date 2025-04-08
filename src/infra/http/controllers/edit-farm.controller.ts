import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditFarmUseCase } from '@/domain/erm/application/use-cases/edit-farm'
import { States } from '@prisma/client'

const editFarmBodySchema = z.object({
  ownerId: z.string().uuid(),

  name: z.string(),
  city: z.string(),
  state: z.nativeEnum(States),
  farmArea: z.number(),
  vegetationArea: z.number(),
  agriculturalArea: z.number(),

  crops: z.array(z.string().uuid())
})

const bodyValidationPipe = new ZodValidationPipe(editFarmBodySchema)

type EditFarmBodySchema = z.infer<typeof editFarmBodySchema>

@Controller('farms/:id')
export class EditFarmController {
  constructor(private editFarm: EditFarmUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditFarmBodySchema,
    @Param('id') farmId: string,
  ) {
    const { ownerId, name, city, state, farmArea, vegetationArea, agriculturalArea, crops } = body

    const result = await this.editFarm.execute({
      ownerId,
      farmId,

      name,
      city,
      state,

      farmArea: farmArea.toString(),
      vegetationArea: vegetationArea.toString(),
      agriculturalArea: agriculturalArea.toString(),

      cropsIds: crops,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}