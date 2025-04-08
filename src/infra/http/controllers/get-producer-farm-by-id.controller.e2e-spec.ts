import request from 'supertest'

import { AppModule } from '@/infra/app.module'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFactory } from 'test/factories/make-producer'
import { FarmCropFactory } from 'test/factories/make-farm-crop'
import { ProducerFarmFactory } from 'test/factories/make-producer-farm'

describe('Get farm by id (E2E)', () => {
  let jwt: JwtService
  let app: INestApplication
  let prisma: PrismaService

  let adminFactory: AdminFactory
  let farmCropFactory: FarmCropFactory
  let producerFactory: ProducerFactory
  let producerFarmFactory: ProducerFarmFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        FarmCropFactory,
        ProducerFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    farmCropFactory = moduleRef.get(FarmCropFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)

    await app.init()
  })


  test('[GET] /producer-farms/:id', async () => {

    const user = await adminFactory.makePrismaAdmin({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer()

    const farm = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer.id,
      name: 'Farm 01',
    })

    const crop = await farmCropFactory.makePrismaFarmCrop({
      farmId: farm.id,
    })

    const farmId = farm.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/producer-farms/${farmId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    if (response.statusCode !== 200) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
    
    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      producerFarmDetails: expect.objectContaining({
        name: 'Farm 01',
        crops: [
          expect.objectContaining({
            id: crop.id.toString(),
          }),
        ],
        city: expect.any(String),
        state: expect.any(String),
        agriculturalArea: expect.any(String),
        vegetationArea: expect.any(String),
        farmArea: expect.objectContaining({
          value: expect.any(Number),
        }),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        farmId: expect.any(String),
        ownerId: expect.any(String),
      }),
    })


  })
})