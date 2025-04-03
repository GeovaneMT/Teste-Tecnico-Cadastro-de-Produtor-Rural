import { PaginationParams } from '@/core/repositories/pagination-params'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { Crop } from '@/domain/erm/enterprise/entities/crop'

export abstract class FarmCropsRepository {
  abstract createMany(farmCrops: FarmCrop[]): Promise<void>
  abstract deleteMany(crops: FarmCrop[]): Promise<void>
  
  abstract findById(id: string): Promise<FarmCrop | null>
  
  abstract deleteManyByFarmId(producerId: string): Promise<void>
  
  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[] | null>

}