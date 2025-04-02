import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmMapper } from '@/infra/database/prisma/mappers/prisma-farm-mapper'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'
import { PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Crop } from '@/domain/erm/enterprise/entities/crop'

@Injectable()
export class PrismaFarmsRepository implements FarmsRepository {
  constructor(
    private prisma: PrismaService
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
    ])
  }

  async create(farm: Farm): Promise<void> {
    const data = PrismaFarmMapper.toPrisma(farm)
  
    await this.prisma.farm.create({
      data,
    })

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
    
    const { producer, ...rest } = farm
    
    if (!producer) {
      return null
    }
    
    const convertedFarm = {
      ...rest,
      owner: producer
    }

    const farmDetails = PrismaFarmDetailsMapper.toDomain(convertedFarm)

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
  
  async findManyByCrops(crops: Crop[], { page }: PaginationParams): Promise<Farm[]> {
    const farms = await this.prisma.farm.findMany({
      where: {
        crops: {
          some: {
            id: { in: crops.map(crop => crop.id.toString()) }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  
    return farms.map(PrismaFarmMapper.toDomain);
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