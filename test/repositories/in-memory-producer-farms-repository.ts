import { PaginationParams } from '@/core/repositories/pagination-params'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

export class InMemoryProducerFarmsRepository implements ProducerFarmsRepository {
  public items: ProducerFarm[] = []

  async create(producerFarm: ProducerFarm): Promise<void> {
    this.items.push(producerFarm)
  }

  async delete(producerFarm: ProducerFarm): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === producerFarm.id)

    this.items.splice(itemIndex, 1)
  }

  async createMany(producerFarms: ProducerFarm[]): Promise<void> {
    this.items.push(...producerFarms)
  }

  async deleteMany(crops: ProducerFarm[]): Promise<void> {
    const producerFarms = this.items.filter((item) => {
      return !crops.some((crop) => crop.equals(item))
    })

    this.items = producerFarms
  }

  async deleteManyByProducerId(producerId: string): Promise<void> {
    const producerFarms = this.items.filter((item) => 
      item.producerId.toString() !== producerId
    )

    this.items = producerFarms
  }

  async findById(id: string): Promise<ProducerFarm | null> {
    const producerFarm = this.items.find((item) => item.id.toString() === id)

    if (!producerFarm) {
      return null
    }

    return producerFarm
  }

  async findByFarmId(farmId: string): Promise<ProducerFarm | null> {
    const producerFarm = this.items.find((item) => item.farmId.toString() === farmId)

    if (!producerFarm) {
      return null
    }

    return producerFarm
  }

  async findManyByFarmsIds(farmsIds: string[], { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = await Promise.all(
      farmsIds.slice((page - 1) * 20, page * 20).map(async farmId => {
        const producerFarm = await this.findByFarmId(farmId)

        if (!producerFarm) {
          throw new Error(`Farm with ID "${farmId}" does not exist.`)
        }

        return producerFarm
      })
    )

    if (!producerFarms) {
      return null
    }

    return producerFarms
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