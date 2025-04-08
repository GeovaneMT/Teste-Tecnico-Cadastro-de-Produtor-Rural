import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaFarmCropMapper } from '@/infra/database/prisma/mappers/prisma-farm-crop-mapper'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

import {
  Producer as PrismaProducer,
  Farm as PrismaFarm,
  Crop as PrismaCrop,
} from '@prisma/client'

export type PrismaFarmDetails = PrismaFarm & {
  owner: PrismaProducer
  crops: PrismaCrop[]
}

export class PrismaFarmDetailsMapper {

  static toDomain(raw: PrismaFarmDetails): FarmDetails {

    const CreateFarmAreaData = {
      farmArea: Number(raw.farmArea),
      agriculturalArea: Number(raw.agriculturalArea),
      vegetationArea: Number(raw.vegetationArea),
    }

    return FarmDetails.create({
      farmId: new UniqueEntityID(raw.id),
      ownerId: new UniqueEntityID(raw.ownerId),
      name: raw.name,
      city: raw.city,
      state: raw.state,

      farmArea: FarmArea.create(CreateFarmAreaData),
      vegetationArea: raw.vegetationArea,
      agriculturalArea: raw.agriculturalArea,

      farmCrops: raw.crops.map(PrismaFarmCropMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
  
}