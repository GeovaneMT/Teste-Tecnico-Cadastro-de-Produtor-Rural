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

@Injectable()
export class PrismaFarmsRepository implements FarmsRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
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
      const cacheData = JSON.parse(cacheHit)

      return cacheData
    }

    const farm = await this.prisma.farm.findUnique({
      where: {
        id,
      },
      include: {
        crops: true,
        producer: true,
      },
    })

    if (!farm) {
      return null
    }
    
    if (!farm.producer) return null

    const farmDetails = PrismaFarmDetailsMapper.toDomain({
      ...farm,
      owner: farm.producer,
    })

    await this.cache.set(
      `question:${id}:details`,
      JSON.stringify(farmDetails),
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

  async findManyByState(state: string, { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
      where: {
        state: {
          contains: state,
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
}