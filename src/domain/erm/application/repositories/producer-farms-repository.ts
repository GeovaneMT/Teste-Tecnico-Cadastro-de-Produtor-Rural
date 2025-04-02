import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'
import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'

export abstract class ProducerFarmsRepository {
  abstract findById(id: string): Promise<ProducerFarm | null>

  abstract findManyByProducerId(producerId: string, params: PaginationParams): Promise<ProducerFarm[]>
  abstract findManyByProducerIdWithOwner(producerId: string, params: PaginationParams): Promise<FarmWithOwner[]>

  abstract create(producerFarm: ProducerFarm): Promise<void>
  abstract delete(producerFarm: ProducerFarm): Promise<void>

  abstract createMany(producerFarms: ProducerFarm[]): Promise<void>
  abstract deleteMany(producerFarms: ProducerFarm[]): Promise<void>
  abstract deleteManyByProducerId(producerId: string): Promise<void>

}