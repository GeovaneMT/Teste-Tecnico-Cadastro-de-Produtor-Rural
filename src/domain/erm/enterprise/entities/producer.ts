import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducerFarmList } from '@/domain/erm/enterprise/entities/producer-farm-list'
import { ProducerCreatedEvent } from '../events/producer-created-event'

export interface ProducerProps {
  name: string
  email: string
  document: Document
  farms: ProducerFarmList

  createdAt: Date
  updatedAt?: Date | null
}

export class Producer extends AggregateRoot<ProducerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }
  
  get farms() {
    return this.props.farms
  }
  
  get document() {
    return this.props.document
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.email.substring(0, 120).trimEnd().concat('...')
  }
  
  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }
  
  set farms(farms: ProducerFarmList) {
    this.props.farms = farms
    this.touch()
  }
  
  set document(document: Document) {
    this.props.document = document
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProducerProps, 'createdAt' | 'farms'>,
    id?: UniqueEntityID,
  ) {
    const producer = new Producer(
      {
        ...props,
        farms: props.farms ?? new ProducerFarmList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewProducer = !id

    if (isNewProducer) {
      producer.addDomainEvent(new ProducerCreatedEvent(producer))
    }

    return producer
  }

}

