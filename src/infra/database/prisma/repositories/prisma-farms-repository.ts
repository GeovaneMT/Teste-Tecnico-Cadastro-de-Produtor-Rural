import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { CacheRepository } from '@/infra/cache/cache-repository'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmMapper } from '@/infra/database/prisma/mappers/prisma-farm-mapper'
import { PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'

import { Farm } from '@/domain/erm/enterprise/entities/farm'

import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'
import { StateCropIndicators } from '@/domain/erm/enterprise/entities/value-objects/state-crop-indicators'

import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'
import { CropByState, CropTypeWithQuantity } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'
import { CropType, States } from '@prisma/client'

@Injectable()
export class PrismaFarmsRepository implements FarmsRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
    private cropsRepository: CropsRepository,
    private farmCropsRepository: FarmCropsRepository
  ) {}

  async save(farm: Farm): Promise<void> {
    const data = PrismaFarmMapper.toPrisma(farm)

    await Promise.all([
      this.prisma.farm.update({
        where: {
          id: farm.id.toString(),
        },
        data,
      }),

      this.farmCropsRepository.createMany(
        farm.crops.getNewItems(),
      ),

      this.farmCropsRepository.deleteMany(
        farm.crops.getRemovedItems(),
      ),

      this.cache.delete(`question:${data.id}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(farm.id)

  }

  async create(farm: Farm): Promise<void> {
    const data = PrismaFarmMapper.toPrisma(farm)
  
    await this.prisma.farm.create({
      data,
    })

    await this.farmCropsRepository.createMany(
      farm.crops.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(farm.id)
  }

  async delete(farm: Farm): Promise<void> {
    const data = PrismaFarmMapper.toPrisma(farm)

    await this.prisma.farm.delete({
      where: {
        id: data.id,
      },
    })
  }
  
  async findById(id: string): Promise<Farm | null> {
    const farm = await this.prisma.farm.findUnique({
      where: {
        id,
      },
    })

    if (!farm) {
      return null
    }

    return PrismaFarmMapper.toDomain(farm)
  }

  async findDetailsById(id: string): Promise<FarmDetails | null> {
    const cacheHit = await this.cache.get(`question:${id}:details`)

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
      `question:${id}:details`,
      JSON.stringify(farm),
    )

    return farmDetails
  }

  async findManyRecent({ page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farms.map(PrismaFarmMapper.toDomain)
  }

  async findManyByOwnerId(ownerId: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
      where: {
        ownerId: {
          contains: ownerId,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farms.map(PrismaFarmMapper.toDomain)
  }

  async findManyByName(name: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }

  async findManyByCity(city: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }

  async findManyByState(state: States, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }
  
  async findManyByVegetationArea(vegetationArea: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }
  
  async findManyByFarmArea(farmArea: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }
  
  async findManyByAgriculturalArea(agriculturalArea: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
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

    return farms.map(PrismaFarmMapper.toDomain)
  }

  async findTotalFarmsQuantity(): Promise<number> {
    return this.prisma.farm.count()
  }

  async findTotalArea(): Promise<number> {
    const farms = await this.prisma.farm.findMany({
      select: {
        farmArea: true,
      },
    })
  
    const total = farms.reduce((sum, farm) => {
      const area = parseFloat(farm.farmArea)
      return sum + (isNaN(area) ? 0 : area)
    }, 0)
  
    return total
  }

  async getCropIndicators(): Promise<CropByState[]> {
    const cropsByState: CropByState[] = []

    for (const state of Object.values(States)) {
      const farms = await this.prisma.farm.findMany({
        where: { state },
        select: { id: true },
      })

      const farmsIds = farms.map((farm) => farm.id)

      const cropTypesWithQuantity: CropTypeWithQuantity[] = []

      for (const cropType of Object.values(CropType)) {
        const CropQuantity = await this.prisma.crop.count({
          where: {
            type: cropType,
            landId: { in: farmsIds },
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