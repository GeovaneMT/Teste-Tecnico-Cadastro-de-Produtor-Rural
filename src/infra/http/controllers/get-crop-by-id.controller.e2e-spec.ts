import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { CropFactory } from 'test/factories/make-crop'
import { AdminFactory } from 'test/factories/make-admin'
import { FarmFactory } from 'test/factories/make-farm'
import { FarmCropFactory } from 'test/factories/make-farm-crop'
import { ProducerFactory } from 'test/factories/make-producer'

describe('Get farm by id (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmFactory: FarmFactory
  let cropFactory: CropFactory
  let farmCropFactory: FarmCropFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        FarmFactory,
        CropFactory,
        FarmCropFactory,
      ],
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

  test('[GET] /crops/:id', async () => {
    const user = await adminFactory.makePrismaAdmin({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer({
      name: 'Producer 01',
      email: 'farm@id.com',
    })

    const farm = await farmFactory.makePrismaFarm({
      name: 'Farm 01',
      ownerId: producer.id,
    })

    const crop = await cropFactory.makePrismaCrop({
      landId: farm.id,
    })

    await farmCropFactory.makePrismaFarmCrop({
      cropId: crop.id,
      farmId: farm.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/crops/${crop.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    if (response.statusCode !== 200) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      crop: expect.objectContaining({
        type: crop.type,
      }),
    })

  })
})