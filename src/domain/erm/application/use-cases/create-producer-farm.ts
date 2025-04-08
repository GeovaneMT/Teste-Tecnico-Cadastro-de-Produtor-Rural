import { States } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface CreateProducerFarmUseCaseRequest {
  producerId: string
  
  name: string
  city: string
  state: States

  farmArea: string
  vegetationArea: string
  agriculturalArea: string  
}

type CreateProducerFarmUseCaseResponse = Either<
  null,
  {
    producerFarm: ProducerFarm
  }
>

@Injectable()
export class CreateProducerFarmUseCase {
  constructor(
    private producerFarmsRepository: ProducerFarmsRepository,
  ) {}

  async execute({
    producerId,
    name,
    city,
    state,

    farmArea,
    vegetationArea,
    agriculturalArea,
  }: CreateProducerFarmUseCaseRequest): Promise<CreateProducerFarmUseCaseResponse> {

    const farmAreaCreateData = {
      farmArea: Number(farmArea), 
      agriculturalArea: Number(agriculturalArea), 
      vegetationArea: Number(vegetationArea),
    }

    const producerFarm = ProducerFarm.create({
      producerId: new UniqueEntityID(producerId),
      name,
      city,
      state,

      farmArea: FarmArea.create(farmAreaCreateData),
      vegetationArea,
      agriculturalArea,
    })

    await this.producerFarmsRepository.create(producerFarm)

    return right({
      producerFarm,
    })
  }
}