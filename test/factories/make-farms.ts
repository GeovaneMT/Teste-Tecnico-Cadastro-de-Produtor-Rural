import { faker } from '@faker-js/faker'

import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaFarmMapper } from '@/infra/database/prisma/mappers/prisma-farm-mapper'

import {
  Farm,
  FarmProps,
} from '@/domain/erm/enterprise/entities/farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { States } from '@prisma/client'

export function makeFarm(
  override: Partial<FarmProps> = {},
  id?: UniqueEntityID,
) {

  const CreateFarmAreaData = {
    farmArea: faker.number.int({ min: 100, max: 200 }),
    agriculturalArea: faker.number.int({ min: 10, max: 50 }),
    vegetationArea: faker.number.int({ min: 10, max: 50 }),
  }

  function getRandomState(): States {
    const values = Object.values(States);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as States
  }

  const farm = Farm.create(
    {
      ownerId: new UniqueEntityID(),
      name: faker.person.fullName(),
      city: faker.location.city(),
      state: getRandomState(),

      farmArea: FarmArea.create(CreateFarmAreaData),
      vegetationArea: CreateFarmAreaData.vegetationArea.toString(),
      agriculturalArea: CreateFarmAreaData.agriculturalArea.toString(),
      
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