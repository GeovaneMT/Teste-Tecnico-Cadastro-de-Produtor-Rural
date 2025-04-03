import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

interface GetProducerByEmailUseCaseRequest {
  email: string
}

type GetProducerByEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    producer: ProducerDetails
  }
>

@Injectable()
export class GetProducerByEmailUseCase {
  constructor(private producersRepository: ProducersRepository) {}

  async execute({
    email,
  }: GetProducerByEmailUseCaseRequest): Promise<GetProducerByEmailUseCaseResponse> {
    const producer = await this.producersRepository.findDetailsByEmail(email)

    if (!producer) {
      return left(new ResourceNotFoundError())
    }

    return right({
      producer,
    })
  }
}