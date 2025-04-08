import { States } from '@prisma/client'

import { ValueObject } from '@/core/entities/value-object'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

export interface FarmWithOwnerProps {
  farmId: UniqueEntityID
  
  ownerId: UniqueEntityID
  owner: string
  
  name: string
  city: string
  state: States

  farmArea: FarmArea
  vegetationArea: string
  agriculturalArea: string

  crops: FarmCropList  

  createdAt: Date
  updatedAt?: Date | null
}

export class FarmWithOwner extends ValueObject<FarmWithOwnerProps> {

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

  static create(props: FarmWithOwnerProps) {
    return new FarmWithOwner(props)
  }
}