import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { FarmFactory } from 'test/factories/make-farms'
import { ProducerFactory } from 'test/factories/make-producers'
import { ProducerFarmFactory } from 'test/factories/make-producer-farms'
import { AdminFactory } from 'test/factories/make-admins'

describe('Get producer by email (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmFactory: FarmFactory
  let producerFarmFactory: ProducerFarmFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        FarmFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmFactory = moduleRef.get(FarmFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /producers/:email', async () => {
    const user = await adminFactory.makePrismaAdmin({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer({
      name: 'Producer 01',
      email: 'producer@email.com',
    })

    const farm = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
      name: 'Some farm',
    })

    await producerFarmFactory.makePrismaProducerFarm({
      farmId: farm.id,
      producerId: producer.id,
    })

    const response = await request(app.getHttpServer())
      .get('/producers/producer@email.com')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    if (response.statusCode !== 200) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      producer: expect.objectContaining({
        name: 'Producer 01',
        farms: [
          expect.objectContaining({
            name: 'Some farm',
          }),
        ],
      }),
    })

  })
})