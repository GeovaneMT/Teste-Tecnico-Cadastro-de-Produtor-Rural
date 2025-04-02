import { PaginationParams } from '@/core/repositories/pagination-params'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

export class InMemoryFarmCropsRepository implements FarmCropsRepository {
  public items: FarmCrop[] = []

  async create(farmCrop: FarmCrop): Promise<void> {
    this.items.push(farmCrop)
  }

  async delete(farmCrop: FarmCrop): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === farmCrop.id)

    this.items.splice(itemIndex, 1)
  }

  async createMany(farmCrops: FarmCrop[]): Promise<void> {
    this.items.push(...farmCrops)
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

  async findById(id: string): Promise<FarmCrop | null> {
    const farmCrop = this.items.find((item) => item.id.toString() === id)

    if (!farmCrop) {
      return null
    }

    return farmCrop
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

  async findManyByCrops(crops: Crop[], { page }: PaginationParams): Promise<FarmCrop[] | null> {
    const cropsIds = crops.map((crop) => crop.id.toString())
    
    const farmCrops = this.items
      .filter((item) => cropsIds.includes(item.cropId.toString()))
      .slice((page - 1) * 20, page * 20)

    if (!farmCrops || farmCrops.length === 0) {
      return null
    }
  
    return farmCrops
  }
  
}