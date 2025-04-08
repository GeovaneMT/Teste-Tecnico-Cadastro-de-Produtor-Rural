import { CropType } from '@prisma/client'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CropProps {
  type: CropType
  description: string

  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Crop<Props extends CropProps> extends Entity<Props> {  

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

  set type(type: CropType) {
    this.props.type = type
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
  
}
