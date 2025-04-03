import { faker } from '@faker-js/faker'

import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmMapper } from '@/infra/database/prisma/mappers/prisma-farm-mapper'

import {
  Farm,
  FarmProps,
} from '@/domain/erm/enterprise/entities/farm'

export function makeFarm(
  override: Partial<FarmProps> = {},
  id?: UniqueEntityID,
) {

  const farm = Farm.create(
    {
      ownerId: new UniqueEntityID(),
      name: faker.person.fullName(),
      city: faker.location.city(),
      state: faker.location.state(),

      farmArea: faker.datatype.number().toString(),
      vegetationArea: faker.datatype.number().toString(),
      agriculturalArea: faker.datatype.number().toString(),
      
      ...override,
    },
    id,
  )

  return farm
}

@Injectable()
export class FarmFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaFarm(data: Partial<FarmProps> = {}): Promise<Farm> {
    const farm = makeFarm(data)

    await this.prisma.farm.create({
      data: PrismaFarmMapper.toPrisma(farm),
    })

    return farm
  }
}