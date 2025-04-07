import { CropType } from '@prisma/client'

import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Crop } from '@/domain/erm/enterprise/entities/crop'

import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

interface CreateCropUseCaseRequest {
  landId: string

  type: CropType
  description: string
}

type CreateCropUseCaseResponse = Either<
  null,
  {
    crop: Crop
  }
>

@Injectable()
export class CreateCropUseCase {
  constructor(
    private cropsRepository: CropsRepository,
  ) {}

  async execute({
    landId,

    type,
    description
  }: CreateCropUseCaseRequest): Promise<CreateCropUseCaseResponse> {

    const crop = Crop.create({
      landId: new UniqueEntityID(landId),
      type,
      description,
    })

    await this.cropsRepository.create(crop)

    return right({
      crop,
    })
  }
}