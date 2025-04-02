import { PaginationParams } from '@/core/repositories/pagination-params'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

export abstract class FarmsRepository {
  abstract save(farm: Farm): Promise<void>
  abstract create(farm: Farm): Promise<void>
  abstract delete(farm: Farm): Promise<void>

  abstract findById(id: string): Promise<Farm | null>

  abstract findDetailsById(id: string): Promise<FarmDetails | null>
  
  abstract findManyByName(name: string): Promise<Farm[] | null>
  abstract findManyByCity(city: string): Promise<Farm[] | null>
  abstract findManyByState(state: string): Promise<Farm[] | null>
  abstract findManyByCrops(crops: string): Promise<Farm[] | null>
  abstract findManyRecent(params: PaginationParams): Promise<Farm[]>
  abstract findManyByFarmArea(farmArea: string): Promise<Farm[] | null>
  abstract findManyByVegetationArea(vegetationArea: string): Promise<Farm[] | null>
  abstract findManyByAgriculturalArea(agriculturalArea: string): Promise<Farm[] | null>
}