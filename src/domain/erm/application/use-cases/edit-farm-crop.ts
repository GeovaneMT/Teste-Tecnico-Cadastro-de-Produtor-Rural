import { CropType } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface EditFarmCropUseCaseRequest {
  landId: string
  farmCropId: string

  type: CropType
  description: string
}

type EditFarmCropUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    farmCrop: FarmCrop
  }
>

@Injectable()
export class EditFarmCropUseCase {
  constructor(
    private farmCropsRepository: FarmCropsRepository,
  ) {}

  async execute({
    landId,
    farmCropId,

    type,
    description
  }: EditFarmCropUseCaseRequest): Promise<EditFarmCropUseCaseResponse> {
    const farmCrop = await this.farmCropsRepository.findById(farmCropId)

    if (!farmCrop) {
      return left(new ResourceNotFoundError())
    }

    if (landId !== farmCrop.farmId.toString()) {
      return left(new NotAllowedError())
    }
        
    farmCrop.type = type
    farmCrop.description = description

    await this.farmCropsRepository.save(farmCrop)

    return right({
      farmCrop,
    })
  }
}