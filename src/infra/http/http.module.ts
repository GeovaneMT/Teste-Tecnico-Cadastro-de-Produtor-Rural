import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { CreateCropController } from '@/infra/http/controllers/create-crop.controller'
import { CreateFarmController } from '@/infra/http/controllers/create-farm.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateProducerController } from '@/infra/http/controllers/create-producer.controller'

import { GetCropByIdController } from '@/infra/http/controllers/get-crop-by-id.controller'
import { GetFarmByIdController } from '@/infra/http/controllers/get-farm-by-id.controller'
import { GetCropIndicatorsController } from '@/infra/http/controllers/get-crop-indicators.controller'
import { GetProducerByEmailController } from '@/infra/http/controllers/get-producer-by-email.controller'

import { FetchTotalAreaController } from '@/infra/http/controllers/fetch-total-area.controller'
import { FetchTotalFarmsController } from '@/infra/http/controllers/fetch-total-farms.controller'
import { FetchRecentCropsController } from '@/infra/http/controllers/fetch-recent-crops.controller'
import { FetchRecentFarmsController } from '@/infra/http/controllers/fetch-recent-farms.controller'
import { FetchRecentProducersController } from '@/infra/http/controllers/fetch-recent-producers.controller'



import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { CreateCropUseCase } from '@/domain/erm/application/use-cases/create-crop'
import { CreateFarmUseCase } from '@/domain/erm/application/use-cases/create-farm'
import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { FetchTotalAreaUseCase } from '@/domain/erm/application/use-cases/fetch-total-area'
import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'
import { FetchRecentCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-crops'
import { FetchRecentFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farms'
import { FetchRecentProducersUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producers'

import { GetCropByIdUseCase } from '@/domain/erm/application/use-cases/get-crop-by-id'
import { GetFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-by-id'
import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    ReadNotificationController,

    CreateCropController,
    CreateFarmController,
    CreateAccountController,
    CreateProducerController,

    FetchTotalAreaController,
    FetchTotalFarmsController,
    FetchRecentCropsController,
    FetchRecentFarmsController,
    FetchRecentProducersController,

    GetCropByIdController,
    GetFarmByIdController,
    GetCropIndicatorsController,
    GetProducerByEmailController,
  ],
  providers: [
    AuthenticateAdminUseCase,
    ReadNotificationUseCase,

    CreateCropUseCase,
    CreateFarmUseCase,
    RegisterAdminUseCase,
    CreateProducerUseCase,

    FetchTotalAreaUseCase,
    FetchTotalFarmsUseCase,
    FetchRecentCropsUseCase,
    FetchRecentFarmsUseCase,
    FetchRecentProducersUseCase,
    
    GetCropByIdUseCase,
    GetFarmByIdUseCase,
    GetCropIndicatorsUseCase,
    GetProducerByEmailUseCase,
  ],
})
export class HttpModule {}