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
import { EditCropUseCase } from '@/domain/erm/application/use-cases/edit-crop'
import { CropType } from '@prisma/client'

const editCropBodySchema = z.object({
  landId: z.string().uuid(),

  type: z.nativeEnum(CropType),
  description: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editCropBodySchema)

type EditCropBodySchema = z.infer<typeof editCropBodySchema>

@Controller('crops/:id')
export class EditCropController {
  constructor(private editCrop: EditCropUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCropBodySchema,
    @Param('id') cropId: string,
  ) {
    const { landId, type, description } = body

    const result = await this.editCrop.execute({
      landId,
      cropId,

      type,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}