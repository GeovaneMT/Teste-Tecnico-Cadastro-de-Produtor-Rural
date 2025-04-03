import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    ReadNotificationController,
  ],
  providers: [
    RegisterAdminUseCase,
    ReadNotificationUseCase,
    AuthenticateAdminUseCase
  ],
})
export class HttpModule {}