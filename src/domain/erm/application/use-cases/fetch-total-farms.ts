import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

type FetchTotalFarmsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    totalFarms: number
  }
>

@Injectable()
export class FetchTotalFarmsUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute(): Promise<FetchTotalFarmsUseCaseResponse> {
    const totalFarms = await this.producerFarmsRepository.findTotalFarmsQuantity()

    if (!totalFarms || totalFarms <= 0) {
      return left(new ResourceNotFoundError())
    }

    return right({
      totalFarms,
    })
  }
}