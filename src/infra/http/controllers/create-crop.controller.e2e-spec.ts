import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admins'
import { CropFactory } from 'test/factories/make-crops'
import { FarmFactory } from 'test/factories/make-farms'
import { ProducerFactory } from 'test/factories/make-producers'

describe('Create farm (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let cropFactory: CropFactory
  let farmFactory: FarmFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProducerFactory, FarmFactory, AdminFactory, CropFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    cropFactory = moduleRef.get(CropFactory)
    farmFactory = moduleRef.get(FarmFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /farms', async () => {

    const user = await adminFactory.makePrismaAdmin()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer()
    
    const farm = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
    })
    
    // const crop1 = await cropFactory.makePrismaCrop({landId: land.id})
    // const crop2 = await cropFactory.makePrismaCrop({landId: land.id})
    
    const response = await request(app.getHttpServer())
      .post(`/producers/${producer.id}/farms/${farm.id}/crops`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        landId: farm.id.toString(), 

        type: 'SOYBEANS',
        description: 'Crop description',
      })

    if (response.statusCode !== 201) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
      
    expect(response.statusCode).toBe(201)

    const cropOnDatabase = await prisma.crop.findFirst({
      where: {
        description: 'Crop description',
      },
    })

    expect(cropOnDatabase).toBeTruthy()
  })
})