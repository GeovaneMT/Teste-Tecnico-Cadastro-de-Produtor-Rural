import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ProducerFarmList } from '@/domain/erm/enterprise/entities/producer-farm-list'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface EditProducerUseCaseRequest {
  producerId: string
  name: string
  email: string
  cpfcnpj: string
  farmsIds: string[]
}

type EditProducerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    producer: Producer
  }
>

@Injectable()
export class EditProducerUseCase {
  constructor(
    private producersRepository: ProducersRepository,
    private producerFarmsRepository: ProducerFarmsRepository,
  ) {}

  async execute({
    producerId,
    name,
    email,
    cpfcnpj,
    farmsIds,
  }: EditProducerUseCaseRequest): Promise<EditProducerUseCaseResponse> {
    const producer = await this.producersRepository.findById(producerId)

    if (!producer) {
      return left(new ResourceNotFoundError())
    }

    const currentProducerFarms = await this.producerFarmsRepository.findManyByProducerId(producerId, { page: 1})

    if (!currentProducerFarms) {
      return left(new ResourceNotFoundError())
    }

    const producerFarmList = new ProducerFarmList(
      currentProducerFarms,
    )

    const producerFarms = farmsIds.map((farmId) => {
      return ProducerFarm.create({
        farmId: new UniqueEntityID(farmId),
        producerId: producer.id,
      })
    })
    
    producerFarmList.update(producerFarms)
    
    const document = Document.create(cpfcnpj)

    producer.farms = producerFarmList
    producer.name = name
    producer.email = email
    producer.document = document

    await this.producersRepository.save(producer)

    return right({
      producer,
    })
  }
}