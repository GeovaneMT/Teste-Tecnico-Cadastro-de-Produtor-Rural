import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { ProducerCreatedEvent } from '@/domain/erm/enterprise/events/producer-created-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Injectable()
export class OnProducerCreated implements EventHandler {
  constructor(
    private adminsRepository: AdminsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewProducerNotification.bind(this),
      ProducerCreatedEvent.name,
    )
  }

  private async sendNewProducerNotification({ producer }: ProducerCreatedEvent) {

      await this.sendNotification.execute({
        recipientId: producer.id.toString(),
        title: `Novo produtor criado: "${producer.name
          .substring(0, 40)
          .concat('...')}"`,
        content: producer.excerpt,
      })
    
  }
}