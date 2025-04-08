import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerFarmCreatedEvent } from '@/domain/erm/enterprise/events/producer-farm-created-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Injectable()
export class OnProducerFarmCreated implements EventHandler {
  constructor(
    private producersRepository: ProducersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewProducerFarmNotification.bind(this),
      ProducerFarmCreatedEvent.name,
    )
  }

  private async sendNewProducerFarmNotification({ producerFarm }: ProducerFarmCreatedEvent) {
    const producer = await this.producersRepository.findById(
      producerFarm.producerId.toString(),
    )

    if (producer) {
      await this.sendNotification.execute({
        recipientId: producer.id.toString(),
        title: `Nova resposta em "${producer.name
          .substring(0, 40)
          .concat('...')}"`,
        content: producerFarm.excerpt,
      })
    }
  }
}