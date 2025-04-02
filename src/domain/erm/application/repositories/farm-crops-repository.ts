import { PaginationParams } from '@/core/repositories/pagination-params'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { Crop } from '@/domain/erm/enterprise/entities/crop'

export abstract class FarmCropsRepository {
  abstract create(farmCrop: FarmCrop): Promise<void>
  abstract delete(farmCrop: FarmCrop): Promise<void>

  abstract createMany(farmCrops: FarmCrop[]): Promise<void>
  abstract deleteMany(crops: FarmCrop[]): Promise<void>
  abstract deleteManyByFarmId(producerId: string): Promise<void>

  abstract findById(id: string): Promise<FarmCrop | null>

  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[] | null>
  abstract findManyByCrops(crops: Crop[], params: PaginationParams): Promise<FarmCrop[] | null>

}