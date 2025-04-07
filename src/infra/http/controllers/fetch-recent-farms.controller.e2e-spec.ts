import request from 'supertest'

import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { AdminFactory } from 'test/factories/make-admins'
import { FarmFactory } from 'test/factories/make-farms'
import { ProducerFactory } from 'test/factories/make-producers'

describe('Fetch recent farms (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmFactory: FarmFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, FarmFactory, ProducerFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmFactory = moduleRef.get(FarmFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /farms', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer({
      name: 'Producer 01',
    })

    await Promise.all([
      farmFactory.makePrismaFarm({
        name: 'Farm 01',
        ownerId: producer.id,
      }),
      farmFactory.makePrismaFarm({
        name: 'Farm 02',
        ownerId: producer.id,
      }),
    ])

    const response = await request(app.getHttpServer())
    .get('/farms')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      farms: expect.arrayContaining([
        expect.objectContaining({ name: 'Farm 01' }),
        expect.objectContaining({ name: 'Farm 02' }),
      ]),
    })
  })
})