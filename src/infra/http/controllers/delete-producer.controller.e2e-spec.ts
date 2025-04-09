import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFactory } from 'test/factories/make-producer'
import { FarmCropFactory } from 'test/factories/make-farm-crop'
import { ProducerFarmFactory } from 'test/factories/make-producer-farm'

describe('Delete a producer (E2E)', () => {
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
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    adminFactory = moduleRef.get(AdminFactory)
    farmCropFactory = moduleRef.get(FarmCropFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)

    await app.init()
  })

  test('[DELETE] /producers/:id', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer()

    const producerId = producer.id.toString()

    const producerFarm = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer.id,
    })

    const farmCrop = await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm.id,
    })

    const farmCropId = farmCrop.id.toString()

    const producerFarmId = producerFarm.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/producers/${producerId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const producerOnDatabase = await prisma.producer.findUnique({
      where: {
        id: producerId,
      },
    })

    expect(producerOnDatabase).toBeNull()

    const producerFarmOnDatabase = await prisma.farm.findUnique({
      where: {
        id: producerFarmId,
      },
    })

    expect(producerFarmOnDatabase).toBeNull()

    const farmCropOnDatabase = await prisma.crop.findUnique({
      where: {
        id: farmCropId,
      },
    })

    expect(farmCropOnDatabase).toBeNull()
  })
})