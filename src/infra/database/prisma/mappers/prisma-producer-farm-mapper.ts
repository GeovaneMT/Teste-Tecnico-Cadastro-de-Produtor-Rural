import { Prisma, Farm as PrismaFarm } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export class PrismaProducerFarmMapper {
  static toDomain(raw: PrismaFarm): ProducerFarm {
    if (!raw.ownerId) {
      throw new Error('Invalid crop type.')
    }

    return ProducerFarm.create(
      {
        farmId: new UniqueEntityID(raw.id),
        producerId: new UniqueEntityID(raw.ownerId),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrismaUpdateMany(
    farms: ProducerFarm[],
  ): Prisma.CropUpdateManyArgs {
    const farmIds = farms.map((farm) => {
      return farm.farmId.toString()
    })

    return {
      where: {
        id: {
          in: farmIds,
        },
      },
      data: {
        farmId: farms[0].farmId.toString(),
      },
    }
  }
}