import { PaginationParams } from '@/core/repositories/pagination-params'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { CropWithLand } from '@/domain/erm/enterprise/entities/value-objects/crop-with-land'
import { CropWithOwner } from '@/domain/erm/enterprise/entities/value-objects/crop-with-owner'

export abstract class FarmCropsRepository {
  abstract createMany(crops: FarmCrop[]): Promise<void>
  abstract deleteMany(crops: FarmCrop[]): Promise<void>
  
  abstract findById(id: string): Promise<FarmCrop | null>
  
  abstract deleteManyByFarmId(producerId: string): Promise<void>
  
  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[] | null>
  
  abstract findManyByFarmIdWithLand(farmId: string, params: PaginationParams): Promise<CropWithLand[] | null>
  
  abstract findManyByFarmIdWithOwner(farmId: string, params: PaginationParams): Promise<CropWithOwner[] | null>

}