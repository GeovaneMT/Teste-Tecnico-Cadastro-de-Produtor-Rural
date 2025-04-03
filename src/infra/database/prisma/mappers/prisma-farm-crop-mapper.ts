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
        cropId: new UniqueEntityID(raw.id),
        farmId: new UniqueEntityID(raw.landId),
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
        landId: crops[0].farmId.toString(),
      },
    }
  }
}