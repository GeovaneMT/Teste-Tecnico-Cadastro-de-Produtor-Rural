import { Injectable } from '@nestjs/common'

import { AdminCreatedEvent } from '@/domain/erm/enterprise/events/admin-created-event'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'

@Injectable()
export class OnAdminCreated implements EventHandler {
  constructor(
    private adminsRepository: AdminsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendAdminNotification.bind(this), AdminCreatedEvent.name)
  }

  private async sendAdminNotification({ admin }: AdminCreatedEvent) {
    const adm = await this.adminsRepository.findByEmail(
      admin.email,
    )
    
    if (adm) {
      await this.sendNotification.execute({
        recipientId: adm.id.toString(),
        title: `Nova resposta para "${adm.name
          .substring(0, 40)
          .concat('...')}"`,
        content: `O novo admin "${adm.name}" foi criado com o email "${adm.email}"`
      })
    }
  }
}
