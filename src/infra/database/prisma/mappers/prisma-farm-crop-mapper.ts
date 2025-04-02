import { Prisma, Crop as PrismaCrop } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export class PrismaFarmCropMapper {
  static toDomain(raw: PrismaCrop): FarmCrop {
    if (!raw.farmId) {
      throw new Error('Invalid crop type.')
    }

    return FarmCrop.create(
      {
        cropId: new UniqueEntityID(raw.id),
        farmId: new UniqueEntityID(raw.farmId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    crops: FarmCrop[],
  ): Prisma.CropUpdateManyArgs {
    const cropIds = crops.map((crop) => {
      return crop.cropId.toString()
    })

    return {
      where: {
        id: {
          in: cropIds,
        },
      },
      data: {
        farmId: crops[0].farmId.toString(),
      },
    }
  }
}