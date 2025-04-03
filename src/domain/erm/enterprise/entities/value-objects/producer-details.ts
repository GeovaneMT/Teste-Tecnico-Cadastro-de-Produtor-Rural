import { ValueObject } from '@/core/entities/value-object'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'

export interface ProducerDetailsProps {
  producerId: UniqueEntityID
  name: string
  email: string
  document: CPF | CNPJ
  farms: Farm[]

  createdAt: Date
  updatedAt?: Date | null
}

export class ProducerDetails extends ValueObject<ProducerDetailsProps> {
  get producerId() {
    return this.props.producerId
  }

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

  static create(props: ProducerDetailsProps) {
    return new ProducerDetails(props)
  }
}