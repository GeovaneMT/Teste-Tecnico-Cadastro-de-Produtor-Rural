import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchRecentProducersUseCaseRequest {
  page: number
}

type FetchRecentProducersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    producers: Producer[]
  }
>

@Injectable()
export class FetchRecentProducersUseCase {
  constructor(private producersRepository: ProducersRepository) {}

  async execute({
    page,
  }: FetchRecentProducersUseCaseRequest): Promise<FetchRecentProducersUseCaseResponse> {
    const producers = await this.producersRepository.findManyRecent({ page })

    if (!producers) {
      return left(new ResourceNotFoundError())
    }

    return right({
      producers,
    })
  }
}