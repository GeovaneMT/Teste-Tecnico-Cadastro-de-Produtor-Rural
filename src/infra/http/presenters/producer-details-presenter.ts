import { FarmDetailsPresenter } from '@/infra/http/presenters/farm-details-presenter'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

export class ProducerDetailsPresenter {
  static toHTTP(producerDetails: ProducerDetails) {
    return {
      producerId: producerDetails.producerId.toString(),
      name: producerDetails.name,      
      email: producerDetails.email,
      document: producerDetails.document.getValue(),
      
      farmsDetails: producerDetails.farmsDetails.map(FarmDetailsPresenter.toHTTP),

      createdAt: producerDetails.createdAt,
      updatedAt: producerDetails.updatedAt,
    }
  }
}