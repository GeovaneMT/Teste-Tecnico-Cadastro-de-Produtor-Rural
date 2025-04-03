import { Module } from '@nestjs/common'

import { CacheModule } from '@/infra/cache/cache.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'



import { PrismaAdminsRepository } from '@/infra/database/prisma/repositories/prisma-admins-repository'
import { PrismaNotificationsRepository } from '@/infra/database/prisma/repositories/prisma-notifications-repository'

import { PrismaCropsRepository } from '@/infra/database/prisma/repositories/prisma-crops-repository'
import { PrismaFarmCropsRepository } from '@/infra/database/prisma/repositories/prisma-farm-crops-repository'

import { PrismaFarmsRepository } from '@/infra/database/prisma/repositories/prisma-farms-repository'
import { PrismaProducerFarmsRepository } from '@/infra/database/prisma/repositories/prisma-producer-farms-repository'

import { PrismaProducersRepository } from '@/infra/database/prisma/repositories/prisma-producers-repository'



import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'
import { FarmCropsRepository } from '@/domain/erm/application/repositories/farm-crops-repository'

import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'
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
      provide: CropsRepository,
      useClass: PrismaCropsRepository,
    },
    {
      provide: FarmCropsRepository,
      useClass: PrismaFarmCropsRepository,
    },
    {
      provide: FarmsRepository,
      useClass: PrismaFarmsRepository,
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
    NotificationsRepository,  
    AdminsRepository,
    CropsRepository,
    FarmCropsRepository,
    FarmsRepository,
    ProducerFarmsRepository,
    ProducersRepository
  ],
})
export class DatabaseModule {}