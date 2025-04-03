import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaCropMapper } from '@/infra/database/prisma/mappers/prisma-crop-mapper'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropType } from '@/domain/erm/utils/crop-type-enum'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

@Injectable()
export class PrismaCropsRepository implements CropsRepository {
  constructor(private prisma: PrismaService) {}

  async save(crop: Crop): Promise<void> {
    const data = PrismaCropMapper.toPrisma(crop)

    await Promise.all([
      this.prisma.crop.update({
        where: {
          id: crop.id.toString(),
        },
        data,
      }),
    ])
  }

  async create(crop: Crop): Promise<void> {
    const data = PrismaCropMapper.toPrisma(crop)
  
    await this.prisma.crop.create({
      data,
    })
  }

  async delete(crop: Crop): Promise<void> {
    const data = PrismaCropMapper.toPrisma(crop)

    await this.prisma.crop.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(id: string): Promise<Crop | null> {
    const crop = await this.prisma.crop.findUnique({
      where: {
        id,
      },
    })

    if (!crop) {
      return null
    }

    return PrismaCropMapper.toDomain(crop)
  }

  async findManyByLandId(landId: string, { page }: PaginationParams): Promise<Crop[]> {
    const crops = await this.prisma.crop.findMany({
      where: {
        landId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return crops.map(PrismaCropMapper.toDomain)
  }

  async findManyByOwnerId(ownerId: string, { page }: PaginationParams): Promise<Crop[]> {
    const crops = await this.prisma.crop.findMany({
      where: {
        ownerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return crops.map(PrismaCropMapper.toDomain)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Crop[]> {
    const crops = await this.prisma.crop.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return crops.map(PrismaCropMapper.toDomain)
  }
  
  async findManyByDescription(description: string, { page }: PaginationParams): Promise<Crop[]> {
    const crops = await this.prisma.crop.findMany({
      where: {
        description,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return crops.map(PrismaCropMapper.toDomain)
  }
  
  async findManyByType(type: CropType, { page }: PaginationParams): Promise<Crop[]> {
    const crops = await this.prisma.crop.findMany({
      where: {
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return crops.map(PrismaCropMapper.toDomain)
  }
  
}