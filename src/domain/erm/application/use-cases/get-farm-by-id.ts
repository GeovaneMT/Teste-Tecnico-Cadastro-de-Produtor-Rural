import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

interface GetFarmByIdUseCaseRequest {
  id: string
}

type GetFarmByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    farm: FarmDetails
  }
>

@Injectable()
export class GetFarmByIdUseCase {
  constructor(private farmsRepository: FarmsRepository) {}

  async execute({
    id,
  }: GetFarmByIdUseCaseRequest): Promise<GetFarmByIdUseCaseResponse> {
    const farm = await this.farmsRepository.findDetailsById(id)

    if (!farm) {
      return left(new ResourceNotFoundError())
    }

    return right({
      farm,
    })
  }
}