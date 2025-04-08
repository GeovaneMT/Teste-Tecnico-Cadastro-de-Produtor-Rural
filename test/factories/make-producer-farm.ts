import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import {
  ProducerFarm,
  ProducerFarmProps,
} from '@/domain/erm/enterprise/entities/producer-farm'

export function makeProducerFarm(
  override: Partial<ProducerFarmProps> = {},
  id?: UniqueEntityID,
) {

  const producerFarm = ProducerFarm.create(
    {
      farmId: new UniqueEntityID(),
      producerId: new UniqueEntityID(),
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

    await this.prisma.farm.update({
      where: {
        id: producerFarm.farmId.toString(),
      },
      data: {
        ownerId: producerFarm.producerId.toString(),
      },
    })

    return producerFarm
  }
}