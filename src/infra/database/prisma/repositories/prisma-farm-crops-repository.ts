import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmCropMapper } from '@/infra/database/prisma/mappers/prisma-farm-crop-mapper'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

@Injectable()
export class PrismaFarmCropsRepository implements FarmCropsRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(crops: FarmCrop[]): Promise<void> {
    if (crops.length === 0) {
      return
    }

    const data = PrismaFarmCropMapper.toPrismaUpdateMany(crops)

    await this.prisma.crop.updateMany(data)
  }

  async deleteMany(crops: FarmCrop[]): Promise<void> {
    if (crops.length === 0) {
      return
    }

    const cropIds = crops.map((crop) => {
      return crop.id.toString()
    })

    await this.prisma.crop.deleteMany({
      where: {
        id: {
          in: cropIds,
        },
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

  async deleteManyByFarmId(farmId: string): Promise<void> {
    await this.prisma.crop.deleteMany({
      where: {
        landId: farmId,
      },
    })
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

}