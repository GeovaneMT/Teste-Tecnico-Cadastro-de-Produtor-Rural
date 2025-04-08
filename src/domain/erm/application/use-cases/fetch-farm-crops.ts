import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface FetchFarmCropsUseCaseRequest {
  landId: string
  page: number
}

type FetchFarmCropsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    farmCrops: FarmCrop[]
  }
>

@Injectable()
export class FetchProducerFarmsUseCase {
  constructor(private farmCropsRepository: FarmCropsRepository) {}

  async execute({
    landId,
    page,
  }: FetchFarmCropsUseCaseRequest): Promise<FetchFarmCropsUseCaseResponse> {
    const farmCrops = await this.farmCropsRepository.findManyByFarmId(
      landId,
        {
          page,
        },
      )

      if (!farmCrops) {
        return left(new ResourceNotFoundError())
      }

    return right({
      farmCrops,
    })
  }
}