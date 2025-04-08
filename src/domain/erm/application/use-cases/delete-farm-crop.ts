import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface deleteFarmCropUseCaseRequest {
  farmCropId: string
}

type successMessage = { message: string }

type deleteFarmCropUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  successMessage
>

@Injectable()
export class DeleteFarmCropUseCase {
  constructor(
    private farmCropsRepository: FarmCropsRepository,
  ) {}

  async execute({
    farmCropId,
  }: deleteFarmCropUseCaseRequest): Promise<deleteFarmCropUseCaseResponse> {
    const farmCrop = await this.farmCropsRepository.findById(farmCropId)

    if (!farmCrop) {
      return left(new ResourceNotFoundError())
    }

    await this.farmCropsRepository.delete(farmCrop)

    return right({message: 'Crop deleted successfully'})
  }
}