import { PaginationParams } from '@/core/repositories/pagination-params'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export abstract class ProducerFarmsRepository {
  abstract create(producerFarm: ProducerFarm): Promise<void>
  abstract delete(producerFarm: ProducerFarm): Promise<void>

  abstract createMany(producerFarms: ProducerFarm[]): Promise<void>
  abstract deleteMany(producerFarms: ProducerFarm[]): Promise<void>
  abstract deleteManyByProducerId(producerId: string): Promise<void>

  abstract findById(id: string): Promise<ProducerFarm | null>
  abstract findByFarmId(farmId: string): Promise<ProducerFarm | null>

  abstract findManyByFarmsIds(farmsIds: string[], params: PaginationParams): Promise<ProducerFarm[] | null>
  abstract findManyByProducerId(producerId: string, params: PaginationParams): Promise<ProducerFarm[] | null>

}