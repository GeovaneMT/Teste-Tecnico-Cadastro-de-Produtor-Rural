import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchRecentFarmsUseCaseRequest {
  page: number
}

type FetchRecentFarmsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    farms: Farm[]
  }
>

@Injectable()
export class FetchRecentFarmsUseCase {
  constructor(private farmsRepository: FarmsRepository) {}

  async execute({
    page,
  }: FetchRecentFarmsUseCaseRequest): Promise<FetchRecentFarmsUseCaseResponse> {
    const farms = await this.farmsRepository.findManyRecent({ page })

    if (!farms) {
      return left(new ResourceNotFoundError())
    }

    return right({
      farms,
    })
  }
}