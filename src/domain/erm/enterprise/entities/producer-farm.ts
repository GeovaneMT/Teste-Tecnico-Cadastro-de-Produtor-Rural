import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProducerFarmProps {
  producerId: UniqueEntityID
  farmId: UniqueEntityID
}

export class ProducerFarm extends Entity<ProducerFarmProps> {
  get producerId() {
    return this.props.producerId
  }

  get attachmentId() {
    return this.props.farmId
  }

  static create(props: ProducerFarmProps, id?: UniqueEntityID) {
    const producerFarm = new ProducerFarm(props, id)

    return producerFarm
  }
}