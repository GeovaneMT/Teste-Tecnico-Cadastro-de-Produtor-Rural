import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ProducerFarmList } from '@/domain/erm/enterprise/entities/producer-farm-list'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface EditProducerUseCaseRequest {
  producerId: string
  name: string
  email: string
  document: string
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
    document,
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
  
    let doc: CPF | CNPJ

    try {
      doc = CPF.create(document)
    } catch {
      doc = CNPJ.create(document)
    }

    producerFarmList.update(producerFarms)

    producer.farms = producerFarmList
    producer.name = name
    producer.email = email
    producer.document = doc

    await this.producersRepository.save(producer)

    return right({
      producer,
    })
  }
}