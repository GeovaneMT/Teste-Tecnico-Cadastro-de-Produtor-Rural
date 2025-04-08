import { Injectable } from '@nestjs/common' 

import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

import { ProducerCreatedEvent } from '@/domain/erm/enterprise/events/producer-created-event'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Injectable()
export class OnProducerCreated implements EventHandler {
  constructor(
    private producersRepository: ProducersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      ProducerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ producer: producerFromEvent }: ProducerCreatedEvent) {
    const producer = await this.producersRepository.findById(
      producerFromEvent.id.toString(),
    )

    if (producer) {
      await this.sendNotification.execute({
        recipientId: producer.id.toString(),
        title: `Nova resposta em "${producer.name
          .substring(0, 40)
          .concat('...')}"`,
        content: producerFromEvent.excerpt,
      })
    }
  }
}