import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface FarmCropProps {
  farmId: UniqueEntityID
  cropId: UniqueEntityID
}

export class FarmCrop extends Entity<FarmCropProps> {
  get farmId() {
    return this.props.farmId
  }

  get attachmentId() {
    return this.props.cropId
  }

  static create(props: FarmCropProps, id?: UniqueEntityID) {
    const farmCrop = new FarmCrop(props, id)

    return farmCrop
  }
}