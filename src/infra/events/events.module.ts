import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { OnAdminCreated } from '@/domain/notification/application/subscribers/on-admin-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAdminCreated,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}