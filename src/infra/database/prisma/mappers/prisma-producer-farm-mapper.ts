import { Prisma, Farm as PrismaFarm } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

export class PrismaProducerFarmMapper {
  static toDomain(raw: PrismaFarm): ProducerFarm {
    if (!raw.ownerId) {
      throw new Error('Invalid farm type.')
    }

    return ProducerFarm.create(
      {
        producerId: new UniqueEntityID(raw.ownerId),

        name: raw.name,
        city: raw.city,
        state: raw.state,

        farmArea: FarmArea.create({farmArea: Number(raw.farmArea), agriculturalArea: Number(raw.agriculturalArea), vegetationArea: Number(raw.vegetationArea)}),
        agriculturalArea: raw.agriculturalArea,
        vegetationArea: raw.vegetationArea,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    producerFarm: ProducerFarm,
  ): Prisma.FarmUncheckedCreateInput {
    return {
      id: producerFarm.id.toString(),
      ownerId: producerFarm.producerId.toString(),

      name: producerFarm.name,
      city: producerFarm.city,
      state: producerFarm.state,  

      farmArea: producerFarm.farmArea.getValue().toString(),
      agriculturalArea: producerFarm.agriculturalArea,
      vegetationArea: producerFarm.vegetationArea,

      createdAt: producerFarm.createdAt,
      updatedAt: producerFarm.updatedAt,
    }
  }
  
  static toPrismaUpdateMany(
    farms: ProducerFarm[],
  ): Prisma.FarmUpdateManyArgs {
    const farmIds = farms.map((farm) => {
      return farm.id.toString()
    })

    return {
      where: {
        id: {
          in: farmIds,
        },
      },
      data: {
        ownerId: farms[0].producerId.toString(),
      },
    }
  }

}