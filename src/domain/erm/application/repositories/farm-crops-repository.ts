import { CropType } from '@prisma/client'

import { PaginationParams } from '@/core/repositories/pagination-params'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { CropWithLand } from '@/domain/erm/enterprise/entities/value-objects/crop-with-land'

export abstract class FarmCropsRepository {
  
  abstract save(farmCrop: FarmCrop): Promise<void>
  abstract create(farmCrop: FarmCrop): Promise<void>
  abstract delete(farmCrop: FarmCrop): Promise<void>
  
  abstract findById(id: string): Promise<FarmCrop | null>
  
  abstract createMany(farmCrops: FarmCrop[]): Promise<void>
  abstract deleteMany(farmCrops: FarmCrop[]): Promise<void>

  abstract deleteManyByFarmId(producerId: string): Promise<void>

  abstract findManyRecent(params: PaginationParams): Promise<FarmCrop[] | null>

  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[] | null>

  abstract findManyByType(type: CropType, params: PaginationParams): Promise<FarmCrop[] | null>
  abstract findManyByDescription(description: string, params: PaginationParams): Promise<FarmCrop[] | null>

}