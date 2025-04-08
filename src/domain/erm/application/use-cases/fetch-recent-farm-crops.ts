import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface FetchRecentFarmCropsUseCaseRequest {
  page: number
}

type FetchRecentFarmCropsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    farmCrops: FarmCrop[]
  }
>

@Injectable()
export class FetchRecentFarmCropsUseCase {
  constructor(private farmCropsRepository: FarmCropsRepository) {}

  async execute({
    page,
  }: FetchRecentFarmCropsUseCaseRequest): Promise<FetchRecentFarmCropsUseCaseResponse> {
    const farmCrops = await this.farmCropsRepository.findManyRecent({ page })

    if (!farmCrops) {
      return left(new ResourceNotFoundError())
    }

    return right({
      farmCrops,
    })
  }
}