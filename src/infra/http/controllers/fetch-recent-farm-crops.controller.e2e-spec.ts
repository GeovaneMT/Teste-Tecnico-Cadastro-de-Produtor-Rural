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

describe('Fetch recent farm crops (E2E)', () => {
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

  test('[GET] /farm-crops', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    
    const producer = await producerFactory.makePrismaProducer()

    const producerFarm = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer.id,
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm.id,
      description: 'Farm Crop 01',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm.id,
      description: 'Farm Crop 02',
    })

    const response = await request(app.getHttpServer())
    .get('/farm-crops')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      farmCrops: expect.arrayContaining([
        expect.objectContaining({ description: 'Farm Crop 01' }),
        expect.objectContaining({ description: 'Farm Crop 02' }),
      ]),
    })
  })
})