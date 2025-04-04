import { ValueObject } from '@/core/entities/value-object'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

export interface FarmDetailsProps {
  farmId: UniqueEntityID
  ownerId: UniqueEntityID
  owner: string

  name: string
  city: string
  state: string

  farmArea: FarmArea
  vegetationArea: string
  agriculturalArea: string

  crops: Crop[]

  createdAt: Date
  updatedAt?: Date | null
}

export class FarmDetails extends ValueObject<FarmDetailsProps> {
  get farmId() {
    return this.props.farmId
  }

  get ownerId() {
    return this.props.ownerId
  } 

  get owner() {
    return this.props.owner
  }

  get name() {
    return this.props.name
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get farmArea() {
    return this.props.farmArea
  }

  get vegetationArea() {
    return this.props.vegetationArea
  }

  get agriculturalArea() {
    return this.props.agriculturalArea
  }

  get crops() {
    return this.props.crops
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: FarmDetailsProps) {
    return new FarmDetails(props)
  }
}