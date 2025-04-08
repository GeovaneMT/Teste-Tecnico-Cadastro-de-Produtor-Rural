import { CropType } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmCropMapper } from '@/infra/database/prisma/mappers/prisma-farm-crop-mapper'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

@Injectable()
export class PrismaFarmCropsRepository implements FarmCropsRepository {

  constructor(private prisma: PrismaService) {}

  async save(farmCrop: FarmCrop): Promise<void> {
    const data = PrismaFarmCropMapper.toPrisma(farmCrop)

    await Promise.all([
      this.prisma.crop.update({
        where: {
          id: farmCrop.id.toString(),
        },
        data,
      }),
    ])
  }
  
  async create(farmCrop: FarmCrop): Promise<void> {
    const data = PrismaFarmCropMapper.toPrisma(farmCrop)
  
    await this.prisma.crop.create({
      data,
    })
  }
  
  async delete(farmCrop: FarmCrop): Promise<void> {
    const data = PrismaFarmCropMapper.toPrisma(farmCrop)

    await this.prisma.crop.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(id: string): Promise<FarmCrop | null> {
    const FarmCrop = await this.prisma.crop.findUnique({
      where: {
        id,
      },
    })

    if (!FarmCrop) {
      return null
    }

    return PrismaFarmCropMapper.toDomain(FarmCrop)
  }

  async createMany(farmCrops: FarmCrop[]): Promise<void> {
    if (farmCrops.length === 0) {
      return
    }

    const data = PrismaFarmCropMapper.toPrismaUpdateMany(farmCrops)

    await this.prisma.crop.updateMany(data)
  }

  async deleteMany(farmCrops: FarmCrop[]): Promise<void> {
    if (farmCrops.length === 0) {
      return
    }

    const cropsIds = farmCrops.map((crop) => {
      return crop.id.toString()
    })

    await this.prisma.crop.deleteMany({
      where: {
        id: {
          in: cropsIds,
        },
      },
    })
  }

  async deleteManyByFarmId(farmId: string): Promise<void> {
    await this.prisma.crop.deleteMany({
      where: {
        landId: farmId,
      },
    })
  }

  async findManyRecent({ page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = await this.prisma.crop.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farmCrops.map(PrismaFarmCropMapper.toDomain)
  }

  async findManyByFarmId(farmId: string, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = await this.prisma.crop.findMany({
      where: {
        landId: farmId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farmCrops.map(PrismaFarmCropMapper.toDomain)
  }
  
  async findManyByType(type: CropType, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = await this.prisma.crop.findMany({
      where: {
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farmCrops.map(PrismaFarmCropMapper.toDomain)
  } 

  async findManyByDescription(description: string, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = await this.prisma.crop.findMany({
      where: {
        description,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farmCrops.map(PrismaFarmCropMapper.toDomain)
  }

}