import { PaginationParams } from '@/core/repositories/pagination-params'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

export class InMemoryFarmCropsRepository implements FarmCropsRepository {
  public items: FarmCrop[] = []

  async createMany(farmCrops: FarmCrop[]): Promise<void> {
    this.items.push(...farmCrops)
  }

  async deleteMany(crops: FarmCrop[]): Promise<void> {
    const farmCrops = this.items.filter((item) => {
      return !crops.some((crop) => crop.equals(item))
    })

    this.items = farmCrops
  }

  async findById(id: string): Promise<FarmCrop | null> {
    const farmCrop = this.items.find((item) => item.id.toString() === id)

    if (!farmCrop) {
      return null
    }

    return farmCrop
  }
  
  async deleteManyByFarmId(farmId: string) {
    const farmCrops = this.items.filter(
      (item) => item.farmId.toString() !== farmId,
    )

    this.items = farmCrops
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
  
}