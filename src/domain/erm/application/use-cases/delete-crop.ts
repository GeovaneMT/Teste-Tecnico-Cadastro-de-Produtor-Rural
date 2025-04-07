import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

interface deleteCropUseCaseRequest {
  cropId: string
}

type deleteCropUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteCropUseCase {
  constructor(
    private cropsRepository: CropsRepository,
  ) {}

  async execute({
    cropId,
  }: deleteCropUseCaseRequest): Promise<deleteCropUseCaseResponse> {
    const crop = await this.cropsRepository.findById(cropId)

    if (!crop) {
      return left(new ResourceNotFoundError())
    }

    await this.cropsRepository.delete(crop)

    return right(null)
  }
}