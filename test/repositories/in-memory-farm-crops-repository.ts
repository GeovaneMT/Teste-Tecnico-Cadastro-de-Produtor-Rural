import { CropType } from '@prisma/client'

import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

export class InMemoryFarmCropsRepository implements FarmCropsRepository {
  public items: FarmCrop[] = []
  
  async save(farmCrop: FarmCrop) {
    const itemIndex = this.items.findIndex((item) => item.id === farmCrop.id)

    this.items[itemIndex] = farmCrop

    DomainEvents.dispatchEventsForAggregate(farmCrop.id)
  }

  async create(farmCrop: FarmCrop) {
    this.items.push(farmCrop)

    DomainEvents.dispatchEventsForAggregate(farmCrop.id)
  }

  async delete(farmCrop: FarmCrop) {
    const itemIndex = this.items.findIndex((item) => item.id === farmCrop.id)

    this.items.splice(itemIndex, 1)
  }
  
  async findById(id: string): Promise<FarmCrop | null> {
    const farmCrop = this.items.find((item) => item.id.toString() === id)

    if (!farmCrop) {
      return null
    }

    return farmCrop
  }

  async createMany(crops: FarmCrop[]): Promise<void> {
    this.items.push(...crops)
  }

  async deleteMany(crops: FarmCrop[]): Promise<void> {
    const farmCrops = this.items.filter((item) => {
      return !crops.some((crop) => crop.equals(item))
    })

    this.items = farmCrops
  }
  
  async deleteManyByFarmId(farmId: string) {
    const farmCrops = this.items.filter(
      (item) => item.farmId.toString() !== farmId,
    )

    this.items = farmCrops
  }
  
  async findManyRecent({ page }: PaginationParams): Promise<FarmCrop[]> {
    const farmCrops = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    if (!farmCrops || farmCrops.length === 0) {
      return []
    }

    return farmCrops
  }

  async findManyByFarmId(farmId: string, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = this.items
    .filter((item) => item.farmId.toString() === farmId)
    .slice((page - 1) * 20, page * 20)

    if (!farmCrops || farmCrops.length === 0) {
      return null
    }

    return farmCrops
  }
  
  async findManyByType(type: CropType, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = this.items
      .filter((item) => item.type.toString() === type)
      .slice((page - 1) * 20, page * 20)

    if (!farmCrops || farmCrops.length === 0) {
      return null
    }

    return farmCrops
  }
  
  async findManyByDescription(description: CropType, { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const farmCrops = this.items
      .filter((item) => item.description.toString() === description)
      .slice((page - 1) * 20, page * 20)

    if (!farmCrops || farmCrops.length === 0) {
      return null
    }

    return farmCrops
  }
  
}