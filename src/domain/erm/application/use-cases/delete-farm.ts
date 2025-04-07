import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'

interface deleteFarmUseCaseRequest {
  farmId: string
}

type deleteFarmUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteFarmUseCase {
  constructor(
    private farmsRepository: FarmsRepository,
  ) {}

  async execute({
    farmId,
  }: deleteFarmUseCaseRequest): Promise<deleteFarmUseCaseResponse> {
    const farm = await this.farmsRepository.findById(farmId)

    if (!farm) {
      return left(new ResourceNotFoundError())
    }

    await this.farmsRepository.delete(farm)

    return right(null)
  }
}