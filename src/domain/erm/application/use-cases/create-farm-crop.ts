import { CropType } from '@prisma/client'

import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface CreateFarmCropUseCaseRequest {
  farmId: string

  type: CropType
  description: string
}

type CreateFarmCropUseCaseResponse = Either<
  null,
  {
    farmCrop: FarmCrop
  }
>

@Injectable()
export class CreateFarmCropUseCase {
  constructor(
    private farmCropsRepository: FarmCropsRepository,
  ) {}

  async execute({
    farmId,

    type,
    description
  }: CreateFarmCropUseCaseRequest): Promise<CreateFarmCropUseCaseResponse> {

    const farmCrop = FarmCrop.create({
      farmId: new UniqueEntityID(farmId),
      type,
      description,
    })

    await this.farmCropsRepository.create(farmCrop)

    return right({
      farmCrop,
    })
  }
}