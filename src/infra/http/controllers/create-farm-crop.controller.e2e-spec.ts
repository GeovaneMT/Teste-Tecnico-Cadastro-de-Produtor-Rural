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

describe('Create a farm crop (E2E)', () => {
  let jwt: JwtService
  let app: INestApplication
  let prisma: PrismaService

  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmCropFactory: FarmCropFactory
  let producerFarmFactory: ProducerFarmFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        FarmCropFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    jwt = moduleRef.get(JwtService)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmCropFactory = moduleRef.get(FarmCropFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)

    await app.init()
  })

  test('[POST] /farm-crops', async () => {

    const user = await adminFactory.makePrismaAdmin()
    const accessToken = jwt.sign({
      sub: user.id.toString(),
      role: user.role
    })
    const producer = await producerFactory.makePrismaProducer()
    
    const producerFarm = await producerFarmFactory.makePrismaProducerFarm({
      producerId: producer.id,
    })
    
    const response = await request(app.getHttpServer())
      .post(`/farm-crops`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        farmId: producerFarm.id.toString(), 

        type: 'SOYBEANS',
        description: 'Crop soy description',
      })

    if (response.statusCode !== 201) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
      
    expect(response.statusCode).toBe(201)

    const farmCropOnDatabase = await prisma.crop.findFirst({
      where: {
        description: 'Crop soy description',
      },
    })

    expect(farmCropOnDatabase).toBeTruthy()
  })
})