import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

import { States } from '@/domain/erm/utils/state-type-enum'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

interface CreateFarmUseCaseRequest {
  ownerId: string
  name: string
  city: string
  state: States

  farmArea: string
  vegetationArea: string
  agriculturalArea: string  

  cropsIds: string[]
}

type CreateFarmUseCaseResponse = Either<
  null,
  {
    farm: Farm
  }
>

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private farmsRepository: FarmsRepository,
  ) {}

  async execute({
    ownerId,
    name,
    city,
    state,

    farmArea,
    vegetationArea,
    agriculturalArea,

    cropsIds,
  }: CreateFarmUseCaseRequest): Promise<CreateFarmUseCaseResponse> {

    const farmAreaCreateData = {
      farmArea: Number(farmArea), 
      agriculturalArea: Number(agriculturalArea), 
      vegetationArea: Number(vegetationArea),
    }

    const farm = Farm.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
      city,
      state,

      farmArea: FarmArea.create(farmAreaCreateData),
      vegetationArea,
      agriculturalArea,
    })

    const FarmCrops = cropsIds.map((cropId) => {
      return FarmCrop.create({
        cropId: new UniqueEntityID(cropId),
        farmId: farm.id,
      })
    })

    farm.crops = new FarmCropList(FarmCrops)

    await this.farmsRepository.create(farm)

    return right({
      farm,
    })
  }
}