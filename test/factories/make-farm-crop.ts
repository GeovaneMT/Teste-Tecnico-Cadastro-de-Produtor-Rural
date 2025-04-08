import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import {
  FarmCrop,
  FarmCropProps,
} from '@/domain/erm/enterprise/entities/farm-crop'
import { CropType } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { PrismaFarmCropMapper } from '@/infra/database/prisma/mappers/prisma-farm-crop-mapper'

export function makeFarmCrop(
  override: Partial<FarmCropProps> = {},
  id?: UniqueEntityID,
) {
  
  const getRandomCropType = () => {
    const values = Object.values(CropType)
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as CropType
  }

  const farmCrop = FarmCrop.create(
    {
      farmId: new UniqueEntityID(),

      type: getRandomCropType(),
      description: faker.lorem.sentence(10),
      
      ...override,
    },
    id,
  )

  return farmCrop
}

@Injectable()
export class FarmCropFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaFarmCrop(data: Partial<FarmCropProps> = {}): Promise<FarmCrop> {
    const farmCrop = makeFarmCrop(data)

    await this.prisma.crop.create({
      // data: {
      //   id: farmCrop.id.toString(),

      //   landId: farmCrop.farmId.toString(),
        
      //   type: farmCrop.type,
      //   description: farmCrop.description,

      //   createdAt: farmCrop.createdAt,
      //   updatedAt: farmCrop.updatedAt,
      // },
      data: PrismaFarmCropMapper.toPrisma(farmCrop)
    })

    return farmCrop
  }
}