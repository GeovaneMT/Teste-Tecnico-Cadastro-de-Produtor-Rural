import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaCropMapper } from '@/infra/database/prisma/mappers/prisma-crop-mapper'

import {
  Crop,
  CropProps,
} from '@/domain/erm/enterprise/entities/crop'
import { CropType } from '@prisma/client'

export function makeCrop(
  override: Partial<CropProps> = {},
  id?: UniqueEntityID,
) {
  
  function getRandomCropType(): CropType {
    const values = Object.values(CropType)
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as CropType
  }

  const crop = Crop.create(
    {
      landId: new UniqueEntityID(),
      type: getRandomCropType(),
      description: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return crop
}

@Injectable()
export class CropFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCrop(data: Partial<CropProps> = {}): Promise<Crop> {
    const crop = makeCrop(data)

    await this.prisma.crop.create({
      data: PrismaCropMapper.toPrisma(crop),
    })

    return crop
  }
}