import { PaginationParams } from '@/core/repositories/pagination-params'
import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export abstract class FarmCropsRepository {
  abstract findById(id: string): Promise<FarmCrop | null>

  abstract findManyByFarmId(farmId: string, params: PaginationParams): Promise<FarmCrop[]>

  abstract create(farmCrop: FarmCrop): Promise<void>
  abstract delete(farmCrop: FarmCrop): Promise<void>

  abstract createMany(farmCrops: FarmCrop[]): Promise<void>
  abstract deleteMany(farmCrops: FarmCrop[]): Promise<void>
  abstract deleteManyByProducerId(producerId: string): Promise<void>

}