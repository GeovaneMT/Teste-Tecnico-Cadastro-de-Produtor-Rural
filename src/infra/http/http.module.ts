import { Module } from '@nestjs/common'
import { EnvModule } from '@/infra/env/env.module'

import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'

import { RefreshController } from '@/infra/http/controllers/refresh.controller'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { ReadNotificationController } from '@/infra/http/controllers/read-notification.controller'

import { CreateFarmCropController } from '@/infra/http/controllers/create-farm-crop.controller'
import { CreateProducerFarmController } from '@/infra/http/controllers/create-producer-farm.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { CreateProducerController } from '@/infra/http/controllers/create-producer.controller'

import { GetCropByIdController } from '@/infra/http/controllers/get-farm-crop-by-id.controller'
import { GetFarmByIdController } from '@/infra/http/controllers/get-producer-farm-by-id.controller'
import { GetCropIndicatorsController } from '@/infra/http/controllers/get-crop-indicators.controller'
import { GetProducerByEmailController } from '@/infra/http/controllers/get-producer-by-email.controller'

import { FetchTotalAreaController } from '@/infra/http/controllers/fetch-total-area.controller'
import { FetchTotalFarmsController } from '@/infra/http/controllers/fetch-total-farms.controller'
import { FetchRecentFarmCropsController } from '@/infra/http/controllers/fetch-recent-farm-crops.controller'
import { FetchRecentProducerFarmsController } from '@/infra/http/controllers/fetch-recent-producer-farms.controller'
import { FetchRecentProducersController } from '@/infra/http/controllers/fetch-recent-producers.controller'

import { EditCropController } from '@/infra/http/controllers/edit-farm-crop.controller'
import { EditProducerFarmController } from '@/infra/http/controllers/edit-producer-farm.controller'
import { EditProducerController } from '@/infra/http/controllers/edit-producer.controller'

import { DeleteFarmCropController } from '@/infra/http/controllers/delete-farm-crop.controller'
import { DeleteFarmController } from '@/infra/http/controllers/delete-producer-farm.controller'
import { DeleteProducerController } from '@/infra/http/controllers/delete-producer.controller'



import { RefreshAdminUseCase } from '@/domain/erm/application/use-cases/refresh-admin'
import { AuthenticateAdminUseCase } from '@/domain/erm/application/use-cases/authenticate-admin'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { CreateFarmCropUseCase } from '@/domain/erm/application/use-cases/create-farm-crop'
import { CreateProducerFarmUseCase } from '@/domain/erm/application/use-cases/create-producer-farm'
import { RegisterAdminUseCase } from '@/domain/erm/application/use-cases/register-admin'
import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { FetchTotalAreaUseCase } from '@/domain/erm/application/use-cases/fetch-total-area'
import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'
import { FetchRecentFarmCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farm-crops'
import { FetchRecentProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producer-farms'
import { FetchRecentProducersUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producers'

import { GetFarmCropByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-crop-by-id'
import { GetProducerFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-producer-farm-by-id'
import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

import { EditFarmCropUseCase } from '@/domain/erm/application/use-cases/edit-farm-crop'
import { EditProducerFarmUseCase } from '@/domain/erm/application/use-cases/edit-producer-farm'
import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'

import { DeleteFarmCropUseCase } from '@/domain/erm/application/use-cases/delete-farm-crop'
import { DeleteProducerFarmUseCase } from '@/domain/erm/application/use-cases/delete-producer-farm'
import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

@Module({
  imports: [DatabaseModule, CryptographyModule, EnvModule],
  controllers: [
    RefreshController,
    AuthenticateController,
    ReadNotificationController,

    CreateFarmCropController,
    CreateProducerFarmController,
    CreateAccountController,
    CreateProducerController,

    FetchTotalAreaController,
    FetchTotalFarmsController,
    FetchRecentFarmCropsController,
    FetchRecentProducerFarmsController,
    FetchRecentProducersController,

    GetCropByIdController,
    GetFarmByIdController,
    GetCropIndicatorsController,
    GetProducerByEmailController,

    EditCropController,
    EditProducerFarmController,
    EditProducerController,

    DeleteFarmCropController,
    DeleteFarmController,
    DeleteProducerController,
  ],
  providers: [
    RefreshAdminUseCase,
    AuthenticateAdminUseCase,
    ReadNotificationUseCase,

    CreateFarmCropUseCase,
    CreateProducerFarmUseCase,
    RegisterAdminUseCase,
    CreateProducerUseCase,

    FetchTotalAreaUseCase,
    FetchTotalFarmsUseCase,
    FetchRecentFarmCropsUseCase,
    FetchRecentProducerFarmsUseCase,
    FetchRecentProducersUseCase,
    
    GetFarmCropByIdUseCase,
    GetProducerFarmByIdUseCase,
    GetCropIndicatorsUseCase,
    GetProducerByEmailUseCase,

    EditFarmCropUseCase,
    EditProducerFarmUseCase,
    EditProducerUseCase,

    DeleteFarmCropUseCase,
    DeleteProducerFarmUseCase,
    DeleteProducerUseCase,
  ],
})
export class HttpModule {}