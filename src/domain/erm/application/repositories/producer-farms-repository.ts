import { PaginationParams } from '@/core/repositories/pagination-params'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'
import { CropByState } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'

export abstract class ProducerFarmsRepository {
  abstract save(producerFarm: ProducerFarm): Promise<void>
  abstract create(producerFarm: ProducerFarm): Promise<void>
  abstract delete(producerFarm: ProducerFarm): Promise<void>
  
  abstract findById(id: string): Promise<ProducerFarm | null>
  
  abstract createMany(producerFarm: ProducerFarm[]): Promise<void>
  abstract deleteMany(producerFarm: ProducerFarm[]): Promise<void>

  abstract deleteManyByProducerId(producerId: string): Promise<void>
  
  abstract findManyRecent(params: PaginationParams): Promise<ProducerFarm[]>
  
  abstract findManyByProducerId(producerId: string, params: PaginationParams): Promise<ProducerFarm[] | null>

  abstract findManyByName(name: string, params: PaginationParams): Promise<ProducerFarm[] | null>
  abstract findManyByCity(city: string, params: PaginationParams): Promise<ProducerFarm[] | null>
  abstract findManyByState(state: string, params: PaginationParams): Promise<ProducerFarm[] | null>

  abstract findManyByFarmArea(farmArea: string, params: PaginationParams): Promise<ProducerFarm[] | null>
  abstract findManyByVegetationArea(vegetationArea: string, params: PaginationParams): Promise<ProducerFarm[] | null>
  abstract findManyByAgriculturalArea(agriculturalArea: string, params: PaginationParams): Promise<ProducerFarm[] | null>
  
  abstract findDetailsById(id: string): Promise<FarmDetails | null>
  
  abstract findTotalArea(): Promise<number>
  
  abstract findTotalFarmsQuantity(): Promise<number>

  abstract getCropIndicators(): Promise<CropByState[] | null>
  
}