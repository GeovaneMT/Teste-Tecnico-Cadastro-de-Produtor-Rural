import { CropType } from '@prisma/client'

import { ValueObject } from '@/core/entities/value-object'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CropWithOwnerProps {
  cropId: UniqueEntityID

  ownerId: UniqueEntityID
  owner: string

  type: CropType
  description: string

  createdAt: Date
  updatedAt?: Date | null
}

export class CropWithOwner extends ValueObject<CropWithOwnerProps> {
  get cropId() {
    return this.props.cropId
  }
  
  get ownerId() {
    return this.props.ownerId
  }
  
  get owner() {
    return this.props.owner
  }
  
  get type() {
    return this.props.type
  }
  
  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CropWithOwnerProps) {
    return new CropWithOwner(props)
  }
}