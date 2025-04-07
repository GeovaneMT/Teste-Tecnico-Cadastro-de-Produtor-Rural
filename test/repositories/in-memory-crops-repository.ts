import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropType } from '@/domain/erm/utils/crop-type-enum'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

export class InMemoryCropsRepository implements CropsRepository {
  public items: Crop[] = []

  async save(crop: Crop) {
    const itemIndex = this.items.findIndex((item) => item.id === crop.id)

    this.items[itemIndex] = crop

    DomainEvents.dispatchEventsForAggregate(crop.id)
  }

  async create(crop: Crop) {
    this.items.push(crop)

    DomainEvents.dispatchEventsForAggregate(crop.id)
  }

  async delete(crop: Crop) {
    const itemIndex = this.items.findIndex((item) => item.id === crop.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Crop | null> {
    const crop = this.items.find((item) => item.id.toString() === id)

    if (!crop) {
      return null
    }

    return crop 
  }
  
  async findManyByLandId(landId: string, { page }: PaginationParams): Promise<Crop[] | null> {
    const crops = this.items
      .filter((item) => item.landId.toString() === landId)
      .slice((page - 1) * 20, page * 20)

    if (!crops || crops.length === 0) {
      return null
    }

    return crops
  }

  async findManyRecent({ page }: PaginationParams): Promise<Crop[]> {
    const crops = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    if (!crops || crops.length === 0) {
      return []
    }

    return crops
  }
  
  async findManyByType(type: CropType, { page }: PaginationParams): Promise<Crop[] | null> {
    const crops = this.items
      .filter((item) => item.type.toString() === type)
      .slice((page - 1) * 20, page * 20)

    if (!crops || crops.length === 0) {
      return null
    }

    return crops
  }
  
  async findManyByDescription(description: CropType, { page }: PaginationParams): Promise<Crop[] | null> {
    const crops = this.items
      .filter((item) => item.description.toString() === description)
      .slice((page - 1) * 20, page * 20)

    if (!crops || crops.length === 0) {
      return null
    }

    return crops
  }

}