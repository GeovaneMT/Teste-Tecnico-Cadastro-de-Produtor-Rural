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
import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'
import { documentValidationSchema } from '@/domain/erm/utils/document-validation'

const editProducerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  document: documentValidationSchema.shape.document,
  farms: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(editProducerBodySchema)

type EditProducerBodySchema = z.infer<typeof editProducerBodySchema>

@Controller('producers/:id')
export class EditProducerController {
  constructor(private editProducer: EditProducerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProducerBodySchema,
    @Param('id') producerId: string,
  ) {
    const { name, email, document, farms } = body

    const result = await this.editProducer.execute({
      name,
      email,
      cpfcnpj: document,
      farmsIds: farms,
      producerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}