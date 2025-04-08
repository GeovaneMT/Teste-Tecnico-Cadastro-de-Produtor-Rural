import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export class ProducerFarmCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public producerFarm: ProducerFarm

  constructor(producerFarm: ProducerFarm) {
    this.producerFarm = producerFarm
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.producerFarm.id
  }
}