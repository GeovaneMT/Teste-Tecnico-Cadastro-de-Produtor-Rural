import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

type FetchTotalAreaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    totalArea: number
  }
>

@Injectable()
export class FetchTotalAreaUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute(): Promise<FetchTotalAreaUseCaseResponse> {
    const totalArea = await this.producerFarmsRepository.findTotalArea()

    if (!totalArea || totalArea <= 0) {
      return left(new ResourceNotFoundError())
    }

    return right({
      totalArea,
    })
  }
}