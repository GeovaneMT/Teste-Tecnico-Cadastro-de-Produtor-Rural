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

import { EditCropController } from '@/infra/http/controllers/edit-crop.controller'
import { EditFarmController } from '@/infra/http/controllers/edit-farm.controller'
import { EditProducerController } from '@/infra/http/controllers/edit-producer.controller'

import { DeleteCropController } from '@/infra/http/controllers/delete-crop'
import { DeleteFarmController } from '@/infra/http/controllers/delete-farm'
import { DeleteProducerController } from '@/infra/http/controllers/delete-producer'



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

import { EditCropUseCase } from '@/domain/erm/application/use-cases/edit-crop'
import { EditFarmUseCase } from '@/domain/erm/application/use-cases/edit-farm'
import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'

import { DeleteCropUseCase } from '@/domain/erm/application/use-cases/delete-crop'
import { DeleteFarmUseCase } from '@/domain/erm/application/use-cases/delete-farm'
import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

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

    EditCropController,
    EditFarmController,
    EditProducerController,

    DeleteCropController,
    DeleteFarmController,
    DeleteProducerController,
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

    EditCropUseCase,
    EditFarmUseCase,
    EditProducerUseCase,

    DeleteCropUseCase,
    DeleteFarmUseCase,
    DeleteProducerUseCase,
  ],
})
export class HttpModule {}