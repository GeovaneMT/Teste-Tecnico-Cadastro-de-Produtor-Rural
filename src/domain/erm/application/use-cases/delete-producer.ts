import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'

interface deleteProducerUseCaseRequest {
  producerId: string
}

type deleteProducerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteProducerUseCase {
  constructor(
    private producersRepository: ProducersRepository,
  ) {}

  async execute({
    producerId,
  }: deleteProducerUseCaseRequest): Promise<deleteProducerUseCaseResponse> {
    const producer = await this.producersRepository.findById(producerId)

    if (!producer) {
      return left(new ResourceNotFoundError())
    }

    await this.producersRepository.delete(producer)

    return right(null)
  }
}