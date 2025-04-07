import { States } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

interface EditFarmUseCaseRequest {
  ownerId: string
  farmId: string

  name: string
  city: string
  state: States

  farmArea: string
  vegetationArea: string
  agriculturalArea: string

  cropsIds: string[]
}

type EditFarmUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    farm: Farm
  }
>

@Injectable()
export class EditFarmUseCase {
  constructor(
    private farmsRepository: FarmsRepository,
    private farmCropsRepository: FarmCropsRepository,
  ) {}

  async execute({
    ownerId,
    farmId,

    name,
    city,
    state,

    farmArea,
    vegetationArea,
    agriculturalArea,

    cropsIds,
  }: EditFarmUseCaseRequest): Promise<EditFarmUseCaseResponse> {
    const farm = await this.farmsRepository.findById(farmId)
    
    if (!farm) {
      return left(new ResourceNotFoundError())
    }
    
    if (ownerId !== farm.ownerId.toString()) {
      return left(new NotAllowedError())
    }
    
    const currentFarmCrops = await this.farmCropsRepository.findManyByFarmId(farmId, { page: 1})
    
    if (!currentFarmCrops) {
      return left(new ResourceNotFoundError())
    }
    
    const farmCropList = new FarmCropList(
      currentFarmCrops,
    )
    
    const farmCrops = cropsIds.map((cropId) => {
      return FarmCrop.create({
        cropId: new UniqueEntityID(cropId),
        farmId: farm.id,
      })
    })
    
    const farmAreaCreateData = {
      farmArea: Number(farmArea), 
      agriculturalArea: Number(agriculturalArea), 
      vegetationArea: Number(vegetationArea),
    }

    
    farmCropList.update(farmCrops)
    
    farm.name = name
    farm.city = city
    farm.state = state
    
    farm.farmArea = FarmArea.create(farmAreaCreateData)

    farm.vegetationArea = vegetationArea
    farm.agriculturalArea = agriculturalArea
    
    farm.crops = farmCropList

    await this.farmsRepository.save(farm)

    return right({
      farm,
    })
  }
}