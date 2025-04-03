import { Producer } from '@/domain/erm/enterprise/entities/producer'

export class ProducerPresenter {
  static toHTTP(producer: Producer) {
    return {
      id: producer.id.toString(),
      
      name: producer.name,
      email: producer.email,
      document: producer.document.getValue(),

      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    }
  }
}