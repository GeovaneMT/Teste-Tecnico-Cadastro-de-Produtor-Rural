import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchProducerFarmsUseCaseRequest {
  producerId: string
  page: number
}

type FetchProducerFarmsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    producerFarms: ProducerFarm[]
  }
>

@Injectable()
export class FetchProducerFarmsUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute({
    producerId,
    page,
  }: FetchProducerFarmsUseCaseRequest): Promise<FetchProducerFarmsUseCaseResponse> {
    const producerFarms = await this.producerFarmsRepository.findManyByProducerId(
        producerId,
        {
          page,
        },
      )

      if (!producerFarms) {
        return left(new ResourceNotFoundError())
      }

    return right({
      producerFarms,
    })
  }
}