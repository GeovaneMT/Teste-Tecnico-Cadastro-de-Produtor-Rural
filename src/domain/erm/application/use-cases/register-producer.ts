import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ProducerFarmList } from '@/domain/erm/enterprise/entities/producer-farm-list'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerAlreadyExistsError } from '@/domain/erm/application/use-cases/errors/producer-already-exists-error'

interface RegisterProducerUseCaseRequest {
  name: string
  email: string
  farmsIds: string[]
  document: CPF | CNPJ
}

type RegisterProducerUseCaseResponse = Either<
  ProducerAlreadyExistsError,
  {
    producer: Producer
  }
>

@Injectable()
export class RegisterProducerUseCase {
  constructor(
    private producersRepository: ProducersRepository,
  ) {}

  async execute({
    name,
    email,
    document,
    farmsIds,
  }: RegisterProducerUseCaseRequest): Promise<RegisterProducerUseCaseResponse> {
    const producerWithSameEmail = await this.producersRepository.findByEmail(email)
    const producerWithSameDocument = await this.producersRepository.findByDocument(document)

    if (producerWithSameEmail) {
      return left(new ProducerAlreadyExistsError('email', email))
    }

    if (producerWithSameDocument) {
      return left(new ProducerAlreadyExistsError('document', document.toString()))
    }

    const producer = Producer.create({
      name,
      email,
      document,
    })

    const producerFarms = farmsIds.map((farmId) => {
      return ProducerFarm.create({
        farmId: new UniqueEntityID(farmId),
        producerId: producer.id,
      })
    })

    producer.farms = new ProducerFarmList(producerFarms)

    await this.producersRepository.create(producer)

    return right({
      producer,
    })
  }
}