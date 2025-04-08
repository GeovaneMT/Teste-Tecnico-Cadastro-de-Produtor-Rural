import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Producer } from '@/domain/erm/enterprise/entities/producer' 
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'

interface EditProducerUseCaseRequest {
  producerId: string
  name: string
  email: string
  document: string
}

type EditProducerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    producer: Producer
  }
>

@Injectable()
export class EditProducerUseCase {
  constructor(
    private producersRepository: ProducersRepository,
  ) {}

  async execute({
    producerId,
    name,
    email,
    document,
  }: EditProducerUseCaseRequest): Promise<EditProducerUseCaseResponse> {
    const producer = await this.producersRepository.findById(producerId)

    if (!producer) {
      return left(new ResourceNotFoundError())
    }

    producer.name = name
    producer.email = email
    producer.document = Document.create(document)

    await this.producersRepository.save(producer)

    return right({
      producer,
    })
  }
}