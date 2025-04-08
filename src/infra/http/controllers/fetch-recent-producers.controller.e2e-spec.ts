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

describe('Fetch recent producers (E2E)', () => {

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

  test('[GET] /producers', async () => {

    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    
    const producer1 = await producerFactory.makePrismaProducer({ name: 'Producer 01' })

    const producer2 = await producerFactory.makePrismaProducer({ name: 'Producer 02' })

    const producerFarm1 = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer1.id,
      name: 'Producer Farm 01',
    })

    const producerFarm2 = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer1.id,
      name: 'Producer Farm 02',
    })

    const producerFarm3 = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer2.id,
      name: 'Producer Farm 03',
    })

    const producerFarm4 = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer2.id,
      name: 'Producer Farm 04',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm1.id,
      description: 'Farm Crop 01',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm1.id,
      description: 'Farm Crop 02',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm2.id,
      description: 'Farm Crop 03',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm2.id,
      description: 'Farm Crop 04',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm3.id,
      description: 'Farm Crop 05',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm3.id,
      description: 'Farm Crop 06',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm4.id,
      description: 'Farm Crop 07',
    })

    await farmCropFactory.makePrismaFarmCrop({
      farmId: producerFarm4.id,
      description: 'Farm Crop 08',
    })

    const response = await request(app.getHttpServer())
    .get('/producers')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      producers: expect.arrayContaining([
        expect.objectContaining({ name: 'Producer 01' }),
        expect.objectContaining({ name: 'Producer 02' }),
      ]),
    })
  })
})