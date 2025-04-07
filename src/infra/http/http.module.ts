import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { CreateFarmController } from '@/infra/http/controllers/create-farm.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateProducerController } from '@/infra/http/controllers/create-producer.controller'

import { FetchTotalAreaController } from '@/infra/http/controllers/fetch-total-area.controller'
import { FetchTotalFarmsController } from '@/infra/http/controllers/fetch-total-farms.controller'
import { GetCropIndicatorsController } from '@/infra/http/controllers/get-crop-indicators.controller'
import { GetProducerByEmailController } from '@/infra/http/controllers/get-producer-by-email'
import { FetchRecentProducersController } from '@/infra/http/controllers/fetch-recent-producers.controller'



import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { CreateFarmUseCase } from '@/domain/erm/application/use-cases/create-farm'
import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { FetchTotalAreaUseCase } from '@/domain/erm/application/use-cases/fetch-total-area'
import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'
import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'
import { FetchRecentProducersUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producers'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    ReadNotificationController,

    CreateFarmController,
    CreateAccountController,
    CreateProducerController,
    
    FetchTotalAreaController,
    FetchTotalFarmsController,
    GetCropIndicatorsController,
    GetProducerByEmailController,
    FetchRecentProducersController,
  ],
  providers: [
    AuthenticateAdminUseCase,
    ReadNotificationUseCase,

    CreateFarmUseCase,
    RegisterAdminUseCase,
    CreateProducerUseCase,

    FetchTotalAreaUseCase,
    FetchTotalFarmsUseCase,
    GetCropIndicatorsUseCase,
    GetProducerByEmailUseCase,
    FetchRecentProducersUseCase,
  ],
})
export class HttpModule {}