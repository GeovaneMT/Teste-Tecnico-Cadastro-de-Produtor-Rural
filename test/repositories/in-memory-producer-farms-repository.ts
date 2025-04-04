import { PaginationParams } from '@/core/repositories/pagination-params'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

export class InMemoryProducerFarmsRepository implements ProducerFarmsRepository {
  public items: ProducerFarm[] = []

  async createMany(farms: ProducerFarm[]): Promise<void> {
    this.items.push(...farms)
  }

  async deleteMany(farms: ProducerFarm[]): Promise<void> {
    const producerFarms = this.items.filter((item) => {
      return !farms.some((farm) => farm.equals(item))
    })

    this.items = producerFarms
  }

  async findById(id: string): Promise<ProducerFarm | null> {
    const producerFarm = this.items.find((item) => item.id.toString() === id)

    if (!producerFarm) {
      return null
    }

    return producerFarm
  }

  async deleteManyByProducerId(producerId: string): Promise<void> {
    const producerFarms = this.items.filter((item) => 
      item.producerId.toString() !== producerId
    )

    this.items = producerFarms
  }

  async findManyByProducerId (producerId: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
    .filter((item) => item.producerId.toString() === producerId)
    .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }
  
}