import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export abstract class ProducerFarmsRepository {
  abstract createMany(farms: ProducerFarm[]): Promise<void>
  abstract deleteMany(farms: ProducerFarm[]): Promise<void>
  
  abstract findById(id: string): Promise<ProducerFarm | null>
  
  abstract deleteManyByProducerId(producerId: string): Promise<void>
  
  abstract findManyByProducerId(producerId: string, params: PaginationParams): Promise<ProducerFarm[] | null>
}