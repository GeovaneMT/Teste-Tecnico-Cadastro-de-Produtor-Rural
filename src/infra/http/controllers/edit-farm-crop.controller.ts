
import { z } from 'zod'
import { CropType } from '@prisma/client'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { EditFarmCropUseCase } from '@/domain/erm/application/use-cases/edit-farm-crop'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'

const EditFarmCropBodySchema = z.object({
  landId: z.string().uuid(),

  type: z.nativeEnum(CropType),
  description: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(EditFarmCropBodySchema)

type EditFarmCropBodySchema = z.infer<typeof EditFarmCropBodySchema>

@Controller('farm-crops/:id')
export class EditCropController {
  constructor(private editFarmCrop: EditFarmCropUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditFarmCropBodySchema,
    @Param('id') farmCropId: string,
  ) {
    const { landId, type, description } = body

    const result = await this.editFarmCrop.execute({
      landId,
      farmCropId,

      type,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}