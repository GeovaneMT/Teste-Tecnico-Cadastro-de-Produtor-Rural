import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

interface GetCropByIdUseCaseRequest {
  id: string
}

type GetCropByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    crop: Crop
  }
>

@Injectable()
export class GetCropByIdUseCase {
  constructor(private cropsRepository: CropsRepository) {}

  async execute({
    id,
  }: GetCropByIdUseCaseRequest): Promise<GetCropByIdUseCaseResponse> {
    const crop = await this.cropsRepository.findById(id)

    if (!crop) {
      return left(new ResourceNotFoundError())
    }

    return right({
      crop,
    })
  }
}