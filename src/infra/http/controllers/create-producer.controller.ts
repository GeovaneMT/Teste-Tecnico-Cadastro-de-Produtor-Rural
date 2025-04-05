import { z } from 'zod'
import { Post, Body, Controller, BadRequestException } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { documentValidationSchema } from '@/domain/erm/utils/document-validation'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

const createProducerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  document: documentValidationSchema.shape.document,
  farms: z.array(z.string().uuid())
})

const bodyValidationPipe = new ZodValidationPipe(createProducerBodySchema)

type CreateProducerBodySchema = z.infer<typeof createProducerBodySchema>

@Controller('/producers')
export class CreateProducerController {
  constructor(private createProducer: CreateProducerUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateProducerBodySchema,
  ) {

    const { name, email, document, farms } = body

    const result = await this.createProducer.execute({
      name,
      email,
      document: Document.create(document),
      farmsIds: farms,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}