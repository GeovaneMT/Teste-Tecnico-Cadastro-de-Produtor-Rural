import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

interface GetProducerFarmByIdUseCaseRequest {
  farmId: string
}

type GetProducerFarmByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    producerFarmDetails: FarmDetails
  }
>

@Injectable()
export class GetProducerFarmByIdUseCase {
  constructor(private producerFarmsRepository: ProducerFarmsRepository) {}

  async execute({
    farmId,
  }: GetProducerFarmByIdUseCaseRequest): Promise<GetProducerFarmByIdUseCaseResponse> {
    const producerFarmDetails = await this.producerFarmsRepository.findDetailsById(farmId)

    if (!producerFarmDetails) {
      return left(new ResourceNotFoundError())
    }

    return right({
      producerFarmDetails,
    })
  }
}