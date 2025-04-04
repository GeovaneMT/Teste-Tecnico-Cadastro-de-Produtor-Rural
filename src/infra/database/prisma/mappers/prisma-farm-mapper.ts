import { Farm as PrismaFarm, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

export class PrismaFarmMapper {

  static toDomain(raw: PrismaFarm): Farm {

    const CreateFarmAreaData = {
      farmArea: Number(raw.farmArea),
      agriculturalArea: Number(raw.agriculturalArea),
      vegetationArea: Number(raw.vegetationArea),
    }

    return Farm.create(
      {
        ownerId: new UniqueEntityID(raw.ownerId),
        name: raw.name,
        city: raw.city,
        state: raw.state,

        farmArea: FarmArea.create(CreateFarmAreaData),
        vegetationArea: raw.vegetationArea,
        agriculturalArea: raw.agriculturalArea,
      
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(farm: Farm): Prisma.FarmUncheckedCreateInput {
    return {
      ownerId: farm.ownerId.toString(),
      id: farm.id.toString(),
      name: farm.name,
      city: farm.city,
      state: farm.state,

      farmArea: farm.farmArea.getValue().toString(),
      vegetationArea: farm.vegetationArea,
      agriculturalArea: farm.agriculturalArea,

      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    }
  }
}