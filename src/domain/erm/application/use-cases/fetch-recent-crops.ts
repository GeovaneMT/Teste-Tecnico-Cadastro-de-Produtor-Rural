import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface FetchRecentCropsUseCaseRequest {
  page: number
}

type FetchRecentCropsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    crops: Crop[]
  }
>

@Injectable()
export class FetchRecentCropsUseCase {
  constructor(private cropsRepository: CropsRepository) {}

  async execute({
    page,
  }: FetchRecentCropsUseCaseRequest): Promise<FetchRecentCropsUseCaseResponse> {
    const crops = await this.cropsRepository.findManyRecent({ page })

    if (!crops) {
      return left(new ResourceNotFoundError())
    }

    return right({
      crops,
    })
  }
}