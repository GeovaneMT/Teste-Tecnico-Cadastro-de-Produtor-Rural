import { Crop as PrismaCrop, Farm as PrismaFarm } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CropWithLand } from '@/domain/erm/enterprise/entities/value-objects/Crop-with-land'

type PrismaCropWithFarm = PrismaCrop & {
  land: PrismaFarm
}

export class PrismaCropWithFarmMapper {
  static toDomain(raw: PrismaCropWithFarm): CropWithLand {
    return CropWithLand.create({
      cropId: new UniqueEntityID(raw.id),

      landId: new UniqueEntityID(raw.land.id),
      land: raw.land.name,

      type: raw.type,
      description: raw.description,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}