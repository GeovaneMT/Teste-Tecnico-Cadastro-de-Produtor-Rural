import { CropType } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditCropUseCaseRequest {
  landId: string
  cropId: string

  type: CropType
  description: string
}

type EditCropUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    crop: Crop
  }
>

@Injectable()
export class EditCropUseCase {
  constructor(
    private cropsRepository: CropsRepository,
  ) {}

  async execute({
    cropId,
    landId,

    type,
    description
  }: EditCropUseCaseRequest): Promise<EditCropUseCaseResponse> {
    const crop = await this.cropsRepository.findById(cropId)

    if (!crop) {
      return left(new ResourceNotFoundError())
    }

    if (landId !== crop.landId.toString()) {
      return left(new NotAllowedError())
    }
        
    crop.type = type
    crop.description = description

    await this.cropsRepository.save(crop)

    return right({
      crop,
    })
  }
}