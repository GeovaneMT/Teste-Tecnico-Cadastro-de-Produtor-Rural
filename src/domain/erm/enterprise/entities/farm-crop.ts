import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Crop, CropProps } from '@/domain/erm/enterprise/entities/crop'

export interface FarmCropProps extends CropProps {
  farmId: UniqueEntityID
}

export class FarmCrop extends Crop<FarmCropProps> {
  get farmId() {
    return this.props.farmId
  }

  static create(
    props: Optional<FarmCropProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const farmCrop = new FarmCrop(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return farmCrop
  }
}