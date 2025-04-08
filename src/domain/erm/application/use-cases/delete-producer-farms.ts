import { Either, left, right } from '@/core/either'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteProducerFarmUseCaseRequest {
  producerId: string
  producerFarmId: string
}

type DeleteProducerFarmUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteProducerFarmUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute({
    producerId,
    producerFarmId,
  }: DeleteProducerFarmUseCaseRequest): Promise<DeleteProducerFarmUseCaseResponse> {
    const producerFarm =
      await this.producerFarmsRepository.findById(producerFarmId)

    if (!producerFarm) {
      return left(new ResourceNotFoundError())
    }

    if (producerFarm.producerId.toString() !== producerId) {
      return left(new NotAllowedError())
    }

    await this.producerFarmsRepository.delete(producerFarm)

    return right(null)
  }
}