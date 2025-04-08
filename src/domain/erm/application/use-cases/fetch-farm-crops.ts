import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-author'

interface FetchProducerFarmsUseCaseRequest {
  producerId: string
  page: number
}

type FetchProducerFarmsUseCaseResponse = Either<
  null,
  {
    farms: FarmWithOwner[]
  }
>

@Injectable()
export class FetchProducerFarmsUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute({
    producerId,
    page,
  }: FetchProducerFarmsUseCaseRequest): Promise<FetchProducerFarmsUseCaseResponse> {
    const farms =
      await this.producerFarmsRepository.findManyByProducerIdWithOwner(
        producerId,
        {
          page,
        },
      )

    return right({
      farms,
    })
  }
}