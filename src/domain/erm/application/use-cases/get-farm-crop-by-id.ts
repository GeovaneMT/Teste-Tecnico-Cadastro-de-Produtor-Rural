import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface GetFarmCropByIdUseCaseRequest {
  id: string
}

type GetFarmCropByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    farmCrop: FarmCrop
  }
>

@Injectable()
export class GetFarmCropByIdUseCase {
  constructor(private farmFarmCropsRepository: FarmCropsRepository) {}

  async execute({
    id,
  }: GetFarmCropByIdUseCaseRequest): Promise<GetFarmCropByIdUseCaseResponse> {
    const farmCrop = await this.farmFarmCropsRepository.findById(id)

    if (!farmCrop) {
      return left(new ResourceNotFoundError())
    }

    return right({
      farmCrop,
    })
  }
}