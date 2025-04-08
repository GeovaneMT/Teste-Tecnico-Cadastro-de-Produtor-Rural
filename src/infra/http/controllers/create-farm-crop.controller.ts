import { z } from 'zod'
import { CropType } from '@prisma/client'
import { Post, Body, Controller } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateFarmCropUseCase } from '@/domain/erm/application/use-cases/create-farm-crop'

const createFarmCropBodySchema = z.object({
  farmId: z.string().uuid(),

  type: z.nativeEnum(CropType),
  description: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createFarmCropBodySchema)

type CreateFarmCropBodySchema = z.infer<typeof createFarmCropBodySchema>

@Controller('/farm-crops')
export class CreateFarmCropController {
  constructor(private createFarmCrop: CreateFarmCropUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateFarmCropBodySchema,
  ) {

    const { farmId, type, description } = body

    const farmCrop = await this.createFarmCrop.execute({
      farmId,
      
      type,
      description,
    })

    if (farmCrop.isLeft()) {
      throw farmCrop.value
    }

    return { farmCrop: farmCrop.value.farmCrop }
  }
}