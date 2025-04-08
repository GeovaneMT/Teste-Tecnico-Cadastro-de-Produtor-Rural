import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface deleteProducerFarmUseCaseRequest {
  producerFarmId: string
}

type successMessage = { message: string }

type deleteProducerFarmUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  successMessage
>

@Injectable()
export class DeleteProducerFarmUseCase {
  constructor(
    private producerFarmsRepository: ProducerFarmsRepository,
  ) {}

  async execute({
    producerFarmId,
  }: deleteProducerFarmUseCaseRequest): Promise<deleteProducerFarmUseCaseResponse> {
    const producerFarm = await this.producerFarmsRepository.findById(producerFarmId)

    if (!producerFarm) {
      return left(new ResourceNotFoundError())
    }

    await this.producerFarmsRepository.delete(producerFarm)

    return right({message: 'farm deleted successfully'})
  }
}