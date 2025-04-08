import { States } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

interface EditProducerFarmUseCaseRequest {
  producerId: string
  producerFarmId: string

  name: string
  city: string
  state: States

  farmArea: string
  vegetationArea: string
  agriculturalArea: string
}

type EditProducerFarmUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    producerFarm: ProducerFarm
  }
>

@Injectable()
export class EditProducerFarmUseCase {
  constructor(
    private farmsRepository: ProducerFarmsRepository,
  ) {}

  async execute({
    producerId,
    producerFarmId,

    name,
    city,
    state,

    farmArea,
    vegetationArea,
    agriculturalArea,
  }: EditProducerFarmUseCaseRequest): Promise<EditProducerFarmUseCaseResponse> {
    const producerFarm = await this.farmsRepository.findById(producerFarmId)
    
    if (!producerFarm) {
      return left(new ResourceNotFoundError())
    }
    
    if (producerId !== producerFarm.producerId.toString()) {
      return left(new NotAllowedError())
    }
    
    const farmAreaCreateData = {
      farmArea: Number(farmArea), 
      agriculturalArea: Number(agriculturalArea), 
      vegetationArea: Number(vegetationArea),
    }
        
    producerFarm.name = name
    producerFarm.city = city
    producerFarm.state = state
    
    producerFarm.farmArea = FarmArea.create(farmAreaCreateData)

    producerFarm.vegetationArea = vegetationArea
    producerFarm.agriculturalArea = agriculturalArea

    await this.farmsRepository.save(producerFarm)

    return right({
      producerFarm,
    })
  }
}