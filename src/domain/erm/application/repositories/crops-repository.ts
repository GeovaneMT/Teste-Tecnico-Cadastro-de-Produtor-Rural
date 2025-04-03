import { PaginationParams } from '@/core/repositories/pagination-params';
import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropType } from '@/domain/erm/utils/crop-type-enum'

export abstract class CropsRepository {
  abstract save(crop: Crop): Promise<void>
  abstract create(crop: Crop): Promise<void>
  abstract delete(crop: Crop): Promise<void>
  
  abstract findById(id: string): Promise<Crop | null>

  abstract findManyByLandId(landId: string, params: PaginationParams): Promise<Crop[] | null>
  abstract findManyByOwnerId(OwnerId: string, params: PaginationParams): Promise<Crop[] | null>
  abstract findManyRecent(params: PaginationParams): Promise<Crop[] | null>

  abstract findManyByType(type: CropType, params: PaginationParams): Promise<Crop[] | null>
  abstract findManyByDescription(description: string, params: PaginationParams): Promise<Crop[] | null>
}