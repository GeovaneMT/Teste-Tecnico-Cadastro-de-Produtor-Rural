import { z } from 'zod'
import { UserRole } from '@prisma/client'

import { Roles } from '@/infra/auth/roles.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { documentValidationSchema } from '@/domain/erm/utils/document-validation'
import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'

const editProducerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  document: documentValidationSchema.shape.document,
})

const bodyValidationPipe = new ZodValidationPipe(editProducerBodySchema)

type EditProducerBodySchema = z.infer<typeof editProducerBodySchema>

@Controller('producers/:id')
export class EditProducerController {
  constructor(private editProducer: EditProducerUseCase) {}

  @Put()
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProducerBodySchema,
    @Param('id') producerId: string,
  ) {
    const { name, email, document } = body

    const result = await this.editProducer.execute({
      producerId,
      
      name,
      email,
      document,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}