import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

export interface FarmWithOwnerProps {
  farmId: UniqueEntityID
  ownerId: UniqueEntityID
  owner: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export class FarmWithOwner extends ValueObject<FarmWithOwnerProps> {
  get farmId() {
    return this.props.farmId
  }

  get content() {
    return this.props.content
  }

  get ownerId() {
    return this.props.ownerId
  }

  get owner() {
    return this.props.owner
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: FarmWithOwnerProps) {
    return new FarmWithOwner(props)
  }
}