import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { CropType } from '@prisma/client'

export interface CropWithLandProps {
  cropId: UniqueEntityID
  
  landId: UniqueEntityID
  land: string
  
  type: CropType
  description: string
  
  createdAt: Date
  updatedAt?: Date | null
}

export class CropWithLand extends ValueObject<CropWithLandProps> {

  get cropId() {
    return this.props.cropId
  }
  
  get landId() {
    return this.props.landId
  }

  get land() {
    return this.props.land
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

  static create(props: CropWithLandProps) {
    return new CropWithLand(props)
  }
}