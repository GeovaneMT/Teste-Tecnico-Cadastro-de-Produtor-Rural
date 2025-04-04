import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaProducerFarmMapper } from '@/infra/database/prisma/mappers/prisma-producer-farm-mapper'
import { PrismaFarmWithOwnerMapper } from '@/infra/database/prisma/mappers/prisma-farm-with-owner-mapper'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

@Injectable()
export class PrismaProducerFarmsRepository implements ProducerFarmsRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(farms: ProducerFarm[]): Promise<void> {
    if (farms.length === 0) {
      return
    }

    const data = PrismaProducerFarmMapper.toPrismaUpdateMany(farms)

    await this.prisma.farm.updateMany(data)
  }

  async deleteMany(farms: ProducerFarm[]): Promise<void> {
    if (farms.length === 0) {
      return
    }

    const farmIds = farms.map((farm) => {
      return farm.id.toString()
    })

    await this.prisma.farm.deleteMany({
      where: {
        id: {
          in: farmIds,
        },
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

  async deleteManyByProducerId(producerId: string): Promise<void> {
    await this.prisma.farm.deleteMany({
      where: {
        ownerId: producerId,
      },
    })
  }

  async findManyByProducerId(producerId: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = await this.prisma.farm.findMany({
      where: {
        ownerId: producerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producerFarms.map(PrismaProducerFarmMapper.toDomain)
  }
  
  async findManyByProducerIdWithOwner(producerId: string, { page }: PaginationParams): Promise<FarmWithOwner[]> {
    const farmCrops = await this.prisma.crop.findMany({
      where: {
        ownerId: producerId,
      },
      include: {
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return farmCrops.map(PrismaFarmWithOwnerMapper.toDomain)
  }
}