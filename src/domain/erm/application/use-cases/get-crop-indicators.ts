import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { CropByState } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

type GetCropIndicatorsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    cropsByState: CropByState[]
  }
>

@Injectable()
export class GetCropIndicatorsUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute(): Promise<GetCropIndicatorsUseCaseResponse> {
    const cropsByState = await this.producerFarmsRepository.getCropIndicators()

    if (!cropsByState) {
      return left(new ResourceNotFoundError())
    }

    return right({
      cropsByState,
    })
  }
}