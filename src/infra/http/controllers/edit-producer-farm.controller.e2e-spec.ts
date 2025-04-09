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

describe('Edit a producer farm (E2E)', () => {
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

  test('[PUT] /producer-farms/:farmId', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    
    const producer = await producerFactory.makePrismaProducer()

    const producerFarm = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer.id,
    })

    const farmCrop = await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm.id,
    })

    const producerId = producer.id.toString()
    const producerFarmId = producerFarm.id.toString()
    const farmCropId = farmCrop.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/producer-farms/${producerFarmId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        producerId: producer.id.toString(),

        name: 'Test Farm Updated',
        city: 'City Updated',
        state: 'SP',

        farmArea: 100,
        vegetationArea: 80,
        agriculturalArea: 20,
      })

      if (response.statusCode !== 204) {
        console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
      }

    expect(response.statusCode).toBe(204)

    const producerOnDatabase = await prisma.producer.findUnique({
      where: {
        id: producerId,
      },
    })

    expect(producerOnDatabase).toBeTruthy()

    const producerFarmOnDatabase = await prisma.farm.findUnique({
      where: {
        id: producerFarmId,

        name: 'Test Farm Updated',
        city: 'City Updated',
        state: 'SP',

        farmArea: '100',
        vegetationArea: '80',
        agriculturalArea: '20',
      },
    })

    expect(producerFarmOnDatabase).toBeTruthy()

    const farmCropOnDatabase = await prisma.crop.findUnique({
      where: {
        id: farmCropId,
      },
    })

    expect(farmCropOnDatabase).toBeTruthy()

  })
})