import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import {
  FarmCrop,
  FarmCropProps,
} from '@/domain/erm/enterprise/entities/farm-crop'

export function makeFarmCrop(
  override: Partial<FarmCropProps> = {},
  id?: UniqueEntityID,
) {

  const farmCrop = FarmCrop.create(
    {
      cropId: new UniqueEntityID(),
      farmId: new UniqueEntityID(),
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

    await this.prisma.crop.update({
      where: {
        id: farmCrop.cropId.toString(),
      },
      data: {
        landId: farmCrop.farmId.toString(),
      },
    })

    return farmCrop
  }
}