import { z } from 'zod'
import { Post, Body, Controller, BadRequestException, ConflictException } from '@nestjs/common'

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { documentValidationSchema } from '@/domain/erm/utils/document-validation'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'
import { ProducerAlreadyExistsError } from '@/domain/erm/application/use-cases/errors/producer-already-exists-error'

const createProducerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  document: documentValidationSchema.shape.document,
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

    const { name, email, document } = body

    const result = await this.createProducer.execute({
      name,
      email,
      document: Document.create(document),
    })
    
    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ProducerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { producer: result.value.producer }
  }
}