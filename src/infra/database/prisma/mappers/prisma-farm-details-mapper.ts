import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaCropMapper } from '@/infra/database/prisma/mappers/prisma-crop-mapper'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

import {
  Producer as PrismaProducer,
  Farm as PrismaFarm,
  Crop as PrismaCrop,
} from '@prisma/client'

type PrismaFarmDetails = PrismaFarm & {
  owner: PrismaProducer
  crops: PrismaCrop[]
}

export class PrismaFarmDetailsMapper {
  static toDomain(raw: PrismaFarmDetails): FarmDetails {
    return FarmDetails.create({
      farmId: new UniqueEntityID(raw.id),
      ownerId: new UniqueEntityID(raw.ownerId),
      owner: raw.owner.name,
      name: raw.name,
      city: raw.city,
      state: raw.state,

      farmArea: raw.farmArea,
      vegetationArea: raw.vegetationArea,
      agriculturalArea: raw.agriculturalArea,

      crops: raw.crops.map(PrismaCropMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}