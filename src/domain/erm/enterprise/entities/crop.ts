import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CropType } from '@/domain/erm/utils/crop-type-enum'

export interface CropProps {
  landId: UniqueEntityID

  type: CropType
  description: string

  createdAt: Date
  updatedAt?: Date | null
}

export class Crop extends Entity<CropProps> {

  get landId() {
    return this.props.landId
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

  static create(
    props: Optional<CropProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const crop = new Crop(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  
    return crop
  }
  
}
