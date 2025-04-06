import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateProducerController } from '@/infra/http/controllers/create-producer.controller'

import { GetProducerByEmailController } from '@/infra/http/controllers/get-producer-by-email'

import { FetchRecentProducersController } from '@/infra/http/controllers/fetch-recent-producers.controller'



import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

import { FetchRecentProducersUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    ReadNotificationController,

    CreateAccountController,
    CreateProducerController,
    
    GetProducerByEmailController,
    
    FetchRecentProducersController,
  ],
  providers: [
    AuthenticateAdminUseCase,
    ReadNotificationUseCase,

    RegisterAdminUseCase,
    CreateProducerUseCase,

    GetProducerByEmailUseCase,
    FetchRecentProducersUseCase,
  ],
})
export class HttpModule {}