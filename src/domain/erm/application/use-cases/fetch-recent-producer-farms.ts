import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface FetchRecentProducerFarmsUseCaseRequest {
  page: number
}

type FetchRecentProducerFarmsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    producerFarms: ProducerFarm[]
  }
>

@Injectable()
export class FetchRecentProducerFarmsUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute({
    page,
  }: FetchRecentProducerFarmsUseCaseRequest): Promise<FetchRecentProducerFarmsUseCaseResponse> {
    const producerFarms = await this.producerFarmsRepository.findManyRecent({ page })

    if (!producerFarms) {
      return left(new ResourceNotFoundError())
    }

    return right({
      producerFarms,
    })
  }
}