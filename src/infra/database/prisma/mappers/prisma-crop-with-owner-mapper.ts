import { Crop as PrismaCrop, Producer as PrismaOwner } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CropWithOwner } from '@/domain/erm/enterprise/entities/value-objects/crop-with-owner'

type PrismaCropWithOwner = PrismaCrop & {
  owner: PrismaOwner
}

export class PrismaCropWithOwnerMapper {
  static toDomain(raw: PrismaCropWithOwner): CropWithOwner {
    return CropWithOwner.create({
      cropId: new UniqueEntityID(raw.id),
      
      ownerId: new UniqueEntityID(raw.owner.id),
      owner: raw.owner.name,

      type: raw.type,
      description: raw.description,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}