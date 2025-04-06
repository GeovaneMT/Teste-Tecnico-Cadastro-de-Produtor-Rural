import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

type FetchTotalAreaUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    totalArea: number
  }
>

@Injectable()
export class FetchTotalAreaUseCase {
  constructor(private farmsRepository: FarmsRepository) {}

  async execute(): Promise<FetchTotalAreaUseCaseResponse> {
    const totalArea = await this.farmsRepository.findTotalArea()

    if (!totalArea || totalArea <= 0) {
      return left(new ResourceNotFoundError())
    }

    return right({
      totalArea,
    })
  }
}