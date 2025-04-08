import { ValueObject } from '@/core/entities/value-object'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { States } from '@prisma/client'

export interface FarmDetailsProps {
  farmId: UniqueEntityID
  ownerId: UniqueEntityID

  name: string
  city: string
  state: States

  farmArea: FarmArea
  vegetationArea: string
  agriculturalArea: string

  farmCrops: FarmCrop[]

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

  get farmCrops() {
    return this.props.farmCrops
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