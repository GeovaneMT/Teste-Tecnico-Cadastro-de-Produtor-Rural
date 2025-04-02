import { Crop as PrismaCrop, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Crop } from '@/domain/erm/enterprise/entities/crop'

export class PrismaCropMapper {
  static toDomain(raw: PrismaCrop): Crop {
    return Crop.create(
      {
        type: raw.type,
        description: raw.description,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(crop: Crop): Prisma.CropUncheckedCreateInput {
    return {
      id: crop.id.toString(),
      type: crop.type,
      description: crop.description,

      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    }
  }
}