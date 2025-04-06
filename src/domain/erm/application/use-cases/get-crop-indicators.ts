import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { StateCropIndicators } from '@/domain/erm/enterprise/entities/value-objects/state-crop-indicators'

type GetCropIndicatorsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    indicators: StateCropIndicators[][][]
  }
>

@Injectable()
export class GetCropIndicatorsUseCase {
  constructor(private farmsRepository: FarmsRepository) {}

  async execute(): Promise<GetCropIndicatorsUseCaseResponse> {
    const indicators = await this.farmsRepository.getCropIndicators()

    if (!indicators) {
      return left(new ResourceNotFoundError())
    }

    return right({
      indicators,
    })
  }
}