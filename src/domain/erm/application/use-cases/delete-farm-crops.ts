import { Either, left, right } from '@/core/either'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteFarmCropUseCaseRequest {
  farmId: string
  farmCropId: string
}

type DeleteFarmCropUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteFarmCropUseCase {
  constructor(private farmCropsRepository: FarmCropsRepository) {}

  async execute({
    farmId,
    farmCropId,
  }: DeleteFarmCropUseCaseRequest): Promise<DeleteFarmCropUseCaseResponse> {
    const farmCrop =
      await this.farmCropsRepository.findById(farmCropId)

    if (!farmCrop) {
      return left(new ResourceNotFoundError())
    }

    if (farmCrop.farmId.toString() !== farmId) {
      return left(new NotAllowedError())
    }

    await this.farmCropsRepository.delete(farmCrop)

    return right(null)
  }
}