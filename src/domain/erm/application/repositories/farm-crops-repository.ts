import { PaginationParams } from '@/core/repositories/pagination-params'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export abstract class FarmCropsRepository {
  abstract createMany(crops: FarmCrop[]): Promise<void>
  abstract deleteMany(crops: FarmCrop[]): Promise<void>
  
  abstract findById(id: string): Promise<FarmCrop | null>
  
  abstract deleteManyByFarmId(producerId: string): Promise<void>
  
  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[] | null>
}