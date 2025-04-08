import { Farm as PrismaFarm, Producer as PrismaProducer } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'

type PrismaFarmWithProducer = PrismaFarm & {
  owner: PrismaProducer
}

export class PrismaFarmWithProducerMapper {
  static toDomain(raw: PrismaFarmWithProducer): FarmWithOwner {
    return FarmWithOwner.create({
      farmId: new UniqueEntityID(raw.id),

      ownerId: new UniqueEntityID(raw.owner.id),
      owner: raw.owner.name,

      name: raw.name,
      city: raw.city,
      state: raw.state,

      farmArea: FarmArea.create({farmArea: Number(raw.farmArea), agriculturalArea: Number(raw.agriculturalArea), vegetationArea: Number(raw.vegetationArea)}),
      agriculturalArea: raw.agriculturalArea,
      vegetationArea: raw.vegetationArea,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}