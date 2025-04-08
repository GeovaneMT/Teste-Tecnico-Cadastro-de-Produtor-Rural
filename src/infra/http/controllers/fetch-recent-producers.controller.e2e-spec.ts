import request from 'supertest'

import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFactory } from 'test/factories/make-producer'

describe('Fetch recent producers (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, ProducerFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /producers', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await Promise.all([
      producerFactory.makePrismaProducer({
        name: 'Producer 01',
      }),
      producerFactory.makePrismaProducer({
        name: 'Producer 02',
      }),
    ])

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