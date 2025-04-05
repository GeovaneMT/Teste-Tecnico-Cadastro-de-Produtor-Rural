import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { OnProducerCreated } from '@/domain/notification/application/subscribers/on-producer-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnProducerCreated,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}