import { z } from 'zod'
import { CropType } from '@prisma/client'
import { Post, Body, Controller } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateCropUseCase } from '@/domain/erm/application/use-cases/create-crop'

const createCropBodySchema = z.object({
  landId: z.string().uuid(),

  type: z.nativeEnum(CropType),
  description: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createCropBodySchema)

type CreateCropBodySchema = z.infer<typeof createCropBodySchema>

@Controller('/producers/:producerId/farms/:farmsId/crops')
export class CreateCropController {
  constructor(private createFarm: CreateCropUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateCropBodySchema,
  ) {

    const { landId, type, description } = body

    const crop = await this.createFarm.execute({
      landId,
      
      type,
      description,
    })

    if (crop.isLeft()) {
      throw crop.value
    }

    return { crop: crop.value.crop }
  }
}