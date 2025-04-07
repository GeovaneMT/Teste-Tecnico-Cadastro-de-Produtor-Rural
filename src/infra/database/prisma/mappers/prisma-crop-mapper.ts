import { Crop as PrismaCrop, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Crop } from '@/domain/erm/enterprise/entities/crop'

export class PrismaCropMapper {
  static toDomain(raw: PrismaCrop): Crop {
    return Crop.create(
      {
        landId: new UniqueEntityID(raw.landId),
        type: raw.type,
        description: raw.description,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(crop: Crop): Prisma.CropUncheckedCreateInput {
    return {
      landId: crop.landId.toString(),
      id: crop.id.toString(),
      type: crop.type,
      description: crop.description,

      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    }
  }
}