import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Producer } from '@/domain/erm/enterprise/entities/producer'

export class ProducerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.producer.id
  }
}