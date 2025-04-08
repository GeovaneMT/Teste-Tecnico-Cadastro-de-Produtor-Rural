import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Farm, FarmProps } from '@/domain/erm/enterprise/entities/farm'
import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

export interface ProducerFarmProps extends FarmProps {
  producerId: UniqueEntityID
}

export class ProducerFarm extends Farm<ProducerFarmProps> {
  get producerId() {
    return this.props.producerId
  }

  static create(
    props: Optional<ProducerFarmProps, 'createdAt' | 'crops'>,
    id?: UniqueEntityID,
  ) {
    const producerFarm = new ProducerFarm(
      {
        ...props,
        crops: props.crops ?? new FarmCropList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return producerFarm
  }
}