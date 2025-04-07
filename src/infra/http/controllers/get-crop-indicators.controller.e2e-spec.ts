
import request from 'supertest'

import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { AdminFactory } from 'test/factories/make-admins'
import { ProducerFactory } from 'test/factories/make-producers'
import { FarmFactory } from 'test/factories/make-farms'
import { FarmCropFactory } from 'test/factories/make-farm-crops'
import { CropFactory } from 'test/factories/make-crops'
import { CropType } from '@prisma/client'

describe('Fetch total farms (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let cropFactory: CropFactory
  let farmCropFactory: FarmCropFactory
  let farmFactory: FarmFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, FarmFactory, ProducerFactory, CropFactory, FarmCropFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmFactory = moduleRef.get(FarmFactory)
    cropFactory = moduleRef.get(CropFactory)
    farmCropFactory = moduleRef.get(FarmCropFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /indicators', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer({
      name: 'Producer 01',
    })

    const farm1 = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
      name: 'Farm 01',
    })
    const farm2 = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
      name: 'Farm 02',
    })

    const farm3 = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
      name: 'Farm 03',
    })

    const farm4 = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
      name: 'Farm 04',
    })    
    
    await cropFactory.makePrismaCrop({
      landId: farm1.id,
      ownerId: producer.id,
    })
    await cropFactory.makePrismaCrop({
      landId: farm2.id,
      ownerId: producer.id,
    })
    await cropFactory.makePrismaCrop({
      landId: farm3.id,
      ownerId: producer.id,
    })
    await cropFactory.makePrismaCrop({
      landId: farm4.id,
      ownerId: producer.id,
    })
    const response = await request(app.getHttpServer())
      .get('/indicators')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.indicators).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          state: expect.any(String),
          cropTypesWithQuantity: expect.arrayContaining([
            expect.objectContaining({
              cropType: expect.any(String),
              total: 1,
            }),
          ]),
        }),
        expect.objectContaining({
          state: expect.any(String),
          cropTypesWithQuantity: expect.arrayContaining([
            expect.objectContaining({
              cropType: expect.any(String),
              total: 1,
            }),
          ]),
        }),
        expect.objectContaining({
          state: expect.any(String),
          cropTypesWithQuantity: expect.arrayContaining([
            expect.objectContaining({
              cropType: expect.any(String),
              total: 1,
            }),
          ]),
        }),
      ])
    )
    
    
  })
})