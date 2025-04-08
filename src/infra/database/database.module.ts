import { Module } from '@nestjs/common'

import { CacheModule } from '@/infra/cache/cache.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'



import { PrismaAdminsRepository } from '@/infra/database/prisma/repositories/prisma-admins-repository'
import { PrismaNotificationsRepository } from '@/infra/database/prisma/repositories/prisma-notifications-repository'

import { PrismaFarmCropsRepository } from '@/infra/database/prisma/repositories/prisma-farm-crops-repository'

import { PrismaProducerFarmsRepository } from '@/infra/database/prisma/repositories/prisma-producer-farms-repository'

import { PrismaProducersRepository } from '@/infra/database/prisma/repositories/prisma-producers-repository'



import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'


@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: AdminsRepository,
      useClass: PrismaAdminsRepository,
    },
    {
      provide: FarmCropsRepository,
      useClass: PrismaFarmCropsRepository,
    },
    {
      provide: ProducerFarmsRepository,
      useClass: PrismaProducerFarmsRepository,
    },
    {
      provide: ProducersRepository,
      useClass: PrismaProducersRepository,
    },
  ],
  exports: [
    PrismaService,

    AdminsRepository,
    NotificationsRepository,  
    
    ProducerFarmsRepository,
    FarmCropsRepository,
    ProducersRepository
  ],
})
export class DatabaseModule {}