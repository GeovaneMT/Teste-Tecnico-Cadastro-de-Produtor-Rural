import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'
import { ProducerFarmList } from '@/domain/erm/enterprise/entities/producer-farm-list'

export interface ProducerProps {
  name: string
  farms: ProducerFarmList
  document: CPF | CNPJ

  createdAt: Date
  updatedAt?: Date | null
}

export class Producer extends AggregateRoot<ProducerProps> {
  get name() {
    return this.props.name
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
  
  set name(name: string) {
    this.props.name = name
    this.touch()
  }
  
  set farms(farms: ProducerFarmList) {
    this.props.farms = farms
    this.touch()
  }
  
  set document(document: CPF | CNPJ) {
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

    return producer
  }

}

