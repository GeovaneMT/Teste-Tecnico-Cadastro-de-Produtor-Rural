import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'

interface FetchRecentProducersUseCaseRequest {
  page: number
}

type FetchRecentProducersUseCaseResponse = Either<
  null,
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
    const producers = (await this.producersRepository.findManyRecent({ page })) ?? []

    return right({
      producers,
    })
  }
}