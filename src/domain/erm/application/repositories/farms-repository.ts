import { PaginationParams } from '@/core/repositories/pagination-params'

import { Farm } from '@/domain/erm/enterprise/entities/farm'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

export abstract class FarmsRepository {
  abstract save(farm: Farm): Promise<void>
  abstract create(farm: Farm): Promise<void>
  abstract delete(farm: Farm): Promise<void>

  abstract findById(id: string): Promise<Farm | null>
  
  abstract findDetailsById(id: string): Promise<FarmDetails | null>
  
  abstract findManyRecent(params: PaginationParams): Promise<Farm[]>
  abstract findManyByOwnerId(ownerId: string, params: PaginationParams): Promise<Farm[] | null>

  abstract findManyByName(name: string, params: PaginationParams): Promise<Farm[] | null>
  abstract findManyByCity(city: string, params: PaginationParams): Promise<Farm[] | null>
  abstract findManyByState(state: string, params: PaginationParams): Promise<Farm[] | null>
  
  abstract findManyByFarmArea(farmArea: string, params: PaginationParams): Promise<Farm[] | null>
  abstract findManyByVegetationArea(vegetationArea: string, params: PaginationParams): Promise<Farm[] | null>
  abstract findManyByAgriculturalArea(agriculturalArea: string, params: PaginationParams): Promise<Farm[] | null>
}