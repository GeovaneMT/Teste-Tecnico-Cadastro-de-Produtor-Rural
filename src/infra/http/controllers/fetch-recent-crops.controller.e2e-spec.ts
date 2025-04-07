import request from 'supertest'

import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { AdminFactory } from 'test/factories/make-admins'
import { FarmFactory } from 'test/factories/make-farms'
import { ProducerFactory } from 'test/factories/make-producers'
import { CropFactory } from 'test/factories/make-crops'

describe('Fetch recent farms (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let cropFactory: CropFactory
  let farmFactory: FarmFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, FarmFactory, ProducerFactory, CropFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    cropFactory = moduleRef.get(CropFactory)
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

    const farm = await farmFactory.makePrismaFarm({
      name: 'Farm 01',
      ownerId: producer.id,
    })

    await Promise.all([
      cropFactory.makePrismaCrop({
        description: 'Farm 01',
        landId: farm.id,
      }),
      cropFactory.makePrismaCrop({
        description: 'Farm 02',
        landId: farm.id,
      }),
    ])

    const response = await request(app.getHttpServer())
    .get('/crops')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      crops: expect.arrayContaining([
        expect.objectContaining({ description: 'Farm 01' }),
        expect.objectContaining({ description: 'Farm 02' }),
      ]),
    })
  })
})