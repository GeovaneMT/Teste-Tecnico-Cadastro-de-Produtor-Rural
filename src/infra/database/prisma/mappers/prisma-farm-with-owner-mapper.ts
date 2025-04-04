import { Farm as PrismaFarm, Producer as PrismaOwner } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'

type PrismaFarmWithOwner = PrismaFarm & {
  owner: PrismaOwner
}

export class PrismaFarmWithOwnerMapper {
  static toDomain(raw: PrismaFarmWithOwner): FarmWithOwner {

    const CreateFarmAreaData = {
      farmArea: Number(raw.farmArea),
      agriculturalArea: Number(raw.agriculturalArea),
      vegetationArea: Number(raw.vegetationArea),
    }

    return FarmWithOwner.create({
      farmId: new UniqueEntityID(raw.id),
      
      ownerId: new UniqueEntityID(raw.owner.id),
      owner: raw.owner.name,

      name: raw.name,
      city: raw.city,
      state: raw.state, 

      farmArea: FarmArea.create(CreateFarmAreaData),
      vegetationArea: raw.vegetationArea,
      agriculturalArea: raw.agriculturalArea,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}