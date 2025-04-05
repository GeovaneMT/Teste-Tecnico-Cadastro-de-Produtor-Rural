import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { GetProducerByEmailController } from '@/infra/http/controllers/get-producer-by-email'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateProducerController } from '@/infra/http/controllers/create-producer.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'
import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    GetProducerByEmailController,

    AuthenticateController,
    CreateAccountController,
    CreateProducerController,
    ReadNotificationController,
  ],
  providers: [
    RegisterAdminUseCase,
    CreateProducerUseCase,
    AuthenticateAdminUseCase,
    GetProducerByEmailUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}