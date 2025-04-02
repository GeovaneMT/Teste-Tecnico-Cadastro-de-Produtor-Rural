import { Module } from '@nestjs/common'

import { CacheModule } from '@/infra/cache/cache.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAdminsRepository } from '@/infra/database/prisma/repositories/prisma-admins-repository'
import { PrismaNotificationsRepository } from '@/infra/database/prisma/repositories/prisma-notifications-repository'

import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: AdminsRepository,
      useClass: PrismaAdminsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    AdminsRepository,
    NotificationsRepository,  
  ],
})
export class DatabaseModule {}