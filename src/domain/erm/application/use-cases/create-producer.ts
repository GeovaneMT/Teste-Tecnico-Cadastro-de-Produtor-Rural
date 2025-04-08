import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerAlreadyExistsError } from '@/domain/erm/application/use-cases/errors/producer-already-exists-error'

interface CreateProducerUseCaseRequest {
  name: string
  email: string
  document: Document
}

type CreateProducerUseCaseResponse = Either<
  ProducerAlreadyExistsError,
  {
    producer: Producer
  }
>

@Injectable()
export class CreateProducerUseCase {
  constructor(
    private producersRepository: ProducersRepository,
  ) {}

  async execute({
    name,
    email,
    document,
  }: CreateProducerUseCaseRequest): Promise<CreateProducerUseCaseResponse> {
    const producerWithSameEmail = await this.producersRepository.findByEmail(email)
    const producerWithSameDocument = await this.producersRepository.findByDocument(document)

    if (producerWithSameEmail) {
      return left(new ProducerAlreadyExistsError('email', email))
    }

    if (producerWithSameDocument) {
      return left(new ProducerAlreadyExistsError('document', document.toString()))
    }

    const producer = Producer.create({
      name,
      email,
      document,
    })

    await this.producersRepository.create(producer)

    return right({
      producer,
    })
  }
}