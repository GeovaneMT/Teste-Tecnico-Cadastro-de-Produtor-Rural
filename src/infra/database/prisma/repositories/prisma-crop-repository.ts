import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaCropMapper } from '@/infra/database/prisma/mappers/prisma-crop-mapper'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

@Injectable()
export class PrismaCropsRepository implements CropsRepository {
  constructor(private prisma: PrismaService) {}

  async create(crop: Crop): Promise<void> {
    const data = PrismaCropMapper.toPrisma(crop)
  
    await this.prisma.crop.create({
      data,
    })
  }

  async createMany(crops: Crop[]): Promise<void> {
    if (crops.length === 0) {
      return
    }
    for (const crop of crops) {
      const data = PrismaCropMapper.toPrisma(crop)
      await this.prisma.crop.create({data})  
    }
  }
  
}