import { FarmPresenter } from '@/infra/http/presenters/farm-presenter'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

export class ProducerDetailsPresenter {
  static toHTTP(producerDetails: ProducerDetails) {
    return {
      producerId: producerDetails.producerId.toString(),
      name: producerDetails.name,      
      email: producerDetails.email,
      document: producerDetails.document.getValue(),
      
      farms: producerDetails.farms.map(FarmPresenter.toHTTP),

      createdAt: producerDetails.createdAt,
      updatedAt: producerDetails.updatedAt,
    }
  }
}