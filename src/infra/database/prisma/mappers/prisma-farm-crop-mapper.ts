import { Prisma, Crop as PrismaCrop } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export class PrismaFarmCropMapper {
  static toDomain(raw: PrismaCrop): FarmCrop {
    if (!raw.landId) {
      throw new Error('Invalid crop type.')
    }

    return FarmCrop.create(
      {
        farmId: new UniqueEntityID(raw.landId),

        type: raw.type,
        description: raw.description,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    farmCrop: FarmCrop,
  ): Prisma.CropUncheckedCreateInput {
    return {
      id: farmCrop.id.toString(),
      landId: farmCrop.farmId.toString(),

      type: farmCrop.type,    
      description: farmCrop.description,

      createdAt: farmCrop.createdAt,
      updatedAt: farmCrop.updatedAt,
    }
  }

  static toPrismaUpdateMany(
    crops: FarmCrop[],
  ): Prisma.CropUpdateManyArgs {
    const cropIds = crops.map((crop) => {
      return crop.id.toString()
    })

    return {
      where: {
        id: {
          in: cropIds,
        },
      },
      data: {
        landId: crops[0].farmId.toString(),
      },
    }
  }

}