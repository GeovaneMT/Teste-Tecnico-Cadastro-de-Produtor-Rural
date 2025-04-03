import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'

interface RegisterFarmUseCaseRequest {
  ownerId: string
  name: string
  city: string
  state: string

  farmArea: string
  vegetationArea: string
  agriculturalArea: string  

  cropsIds: string[]
}

type RegisterFarmUseCaseResponse = Either<
  null,
  {
    farm: Farm
  }
>

@Injectable()
export class RegisterFarmUseCase {
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
  }: RegisterFarmUseCaseRequest): Promise<RegisterFarmUseCaseResponse> {

    const farm = Farm.create({
      ownerId: new UniqueEntityID(ownerId),
      name,
      city,
      state,

      farmArea,
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