import { Injectable } from '@nestjs/common'
import { CropType, States } from '@prisma/client'

import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { CacheRepository } from '@/infra/cache/cache-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'
import { PrismaProducerFarmMapper } from '@/infra/database/prisma/mappers/prisma-producer-farm-mapper'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'
import { CropByState, CropTypeWithQuantity } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

@Injectable()
export class PrismaProducerFarmsRepository implements ProducerFarmsRepository {

  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
    private farmCropsRepository: FarmCropsRepository
  ) {}

  async save(producerFarm: ProducerFarm): Promise<void> {
    const data = PrismaProducerFarmMapper.toPrisma(producerFarm)

    await Promise.all([
      this.prisma.farm.update({
        where: {
          id: producerFarm.id.toString(),
        },
        data,
      }),

      this.farmCropsRepository.createMany(
        producerFarm.crops.getNewItems(),
      ),

      this.farmCropsRepository.deleteMany(
        producerFarm.crops.getRemovedItems(),
      ),

      this.cache.delete(`producer:${data.id}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(producerFarm.id)

  }

  async create(producerFarm: ProducerFarm): Promise<void> {
    const data = PrismaProducerFarmMapper.toPrisma(producerFarm)

    await this.prisma.farm.create({
      data,
    })
    
    await this.farmCropsRepository.createMany(
      producerFarm.crops.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(producerFarm.id)
  }

  async delete(producerFarm: ProducerFarm): Promise<void> {
    await this.prisma.farm.delete({
      where: {
        id: producerFarm.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<ProducerFarm | null> {
    const ProducerFarm = await this.prisma.farm.findUnique({
      where: {
        id,
      },
    })

    if (!ProducerFarm) {
      return null
    }

    return PrismaProducerFarmMapper.toDomain(ProducerFarm)
  }
  
  async createMany(producerFarms: ProducerFarm[]): Promise<void> {
    if (producerFarms.length === 0) {
      return
    }

    const data = PrismaProducerFarmMapper.toPrismaUpdateMany(producerFarms)

    await this.prisma.farm.updateMany(data)
  }

  async deleteMany(producerFarms: ProducerFarm[]): Promise<void> {
    if (producerFarms.length === 0) {
      return
    }

    const farmsIds = producerFarms.map((farm) => {
      return farm.id.toString()
    })

    await this.prisma.farm.deleteMany({
      where: {
        id: {
          in: farmsIds,
        },
      },
    })
  }
  
  async deleteManyByProducerId(producerId: string): Promise<void> {
    const farmsIds = await this.prisma.farm.findMany({
      where: {
        ownerId: producerId,
      },
      select: { id: true },
    })

    await this.prisma.farm.deleteMany({
      where: {
        ownerId: producerId,
      },
    })
    
    for (const farmId of farmsIds) {
      await this.prisma.crop.deleteMany({
        where: {
          landId: farmId.toString(),
        },
      })
    }

}

  async findManyRecent({ page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }
  
  async findManyByProducerId(producerId: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        ownerId: {
          contains: producerId,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }
  
  async findManyByName(name: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findManyByCity(city: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findManyByState(state: States, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        state: {
          equals: state,
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findManyByFarmArea(farmArea: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        farmArea: {
          contains: farmArea,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findManyByVegetationArea(vegetationArea: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        vegetationArea: {
          contains: vegetationArea,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findManyByAgriculturalArea(agriculturalArea: string, { page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        agriculturalArea: {
          contains: agriculturalArea,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }

  async findDetailsById(id: string): Promise<FarmDetails | null> {
    const cacheHit = await this.cache.get(`producer:${id}:details`)

    if (cacheHit) {
      const producer = JSON.parse(cacheHit)
      return PrismaFarmDetailsMapper.toDomain(producer)
    }

    const farm = await this.prisma.farm.findUnique({
      where: {
        id,
      },
      include: {
        crops: true,
        owner: true,
      },
    })

    if (!farm) {
      return null
    }
    
    if (!farm.owner) return null

    const farmDetails = PrismaFarmDetailsMapper.toDomain({
      ...farm,
      owner: farm.owner,
    })

    await this.cache.set(
      `producer:${id}:details`,
      JSON.stringify(farmDetails),
    )

    return farmDetails
  }
  
  async findTotalArea(): Promise<number> {
    const producerFarms = await this.prisma.farm.findMany({
      select: {
        farmArea: true,
      },
    })
  
    const total = producerFarms.reduce((sum, farm) => {
      const area = parseFloat(farm.farmArea)
      return sum + (isNaN(area) ? 0 : area)
    }, 0)
  
    return total
  }

  async findTotalFarmsQuantity(): Promise<number> {
    return this.prisma.farm.count()
  }

  async getCropIndicators(): Promise<CropByState[]> {
    const cropsByState: CropByState[] = []

    for (const state of Object.values(States)) {
      const producerFarms = await this.prisma.farm.findMany({
        where: { state },
        select: { id: true },
      })

      const producerFarmsIds = producerFarms.map((farm) => farm.id)

      const cropTypesWithQuantity: CropTypeWithQuantity[] = []

      for (const cropType of Object.values(CropType)) {
        const CropQuantity = await this.prisma.crop.count({
          where: {
            type: cropType,
            landId: { in: producerFarmsIds },
          },
        })
        
        if (CropQuantity > 0) {
          cropTypesWithQuantity.push({ cropType, total: CropQuantity })
        }
      }

      if (cropTypesWithQuantity.length > 0) {
          cropsByState.push(CropByState.create({state, cropTypesWithQuantity}))
      }
    }

    return cropsByState
  }

}