import { faker } from '@faker-js/faker'
import { States } from '@prisma/client'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

import { ProducerFarm, ProducerFarmProps } from '@/domain/erm/enterprise/entities/producer-farm'
import { PrismaProducerFarmMapper } from '@/infra/database/prisma/mappers/prisma-producer-farm-mapper'

export function makeProducerFarm(
  override: Partial<ProducerFarmProps> = {},
  id?: UniqueEntityID,
) {
  
  const CreateFarmAreaData = {
    farmArea: faker.number.int({ min: 100, max: 200 }),
    agriculturalArea: faker.number.int({ min: 10, max: 40 }),
    vegetationArea: faker.number.int({ min: 10, max: 40 }),
  }

  const getRandomState = () => {
    const values = Object.values(States);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex] as States
  }
  
  const producerFarm = ProducerFarm.create(
    {
      producerId: new UniqueEntityID(),
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

  return producerFarm
}

@Injectable()
export class ProducerFarmFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProducerFarm(data: Partial<ProducerFarmProps> = {}): Promise<ProducerFarm> {
    const producerFarm = makeProducerFarm(data)

    await this.prisma.farm.create({
      // data: {
      //   id: producerFarm.id.toString(),

      //   ownerId: producerFarm.producerId.toString(),
        
      //   name: producerFarm.name,
      //   city: producerFarm.city,
      //   state: producerFarm.state,
        
      //   farmArea: producerFarm.farmArea.getValue().toString(),
      //   agriculturalArea: producerFarm.agriculturalArea,
      //   vegetationArea: producerFarm.vegetationArea,

      //   createdAt: producerFarm.createdAt,
      //   updatedAt: producerFarm.updatedAt,
      // },
      data: PrismaProducerFarmMapper.toPrisma(producerFarm),
    })

    return producerFarm
  }
}