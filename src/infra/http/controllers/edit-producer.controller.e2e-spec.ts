import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { FarmFactory } from 'test/factories/make-farm'
import { ProducerFactory } from 'test/factories/make-producer'
import { ProducerFarmFactory } from 'test/factories/make-producer-farm'
import { AdminFactory } from 'test/factories/make-admin'

describe('Edit producer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
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

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmFactory = moduleRef.get(FarmFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /producers/:id', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    
    const producer = await producerFactory.makePrismaProducer()
    const producerId = producer.id.toString()
    
    const farm1 = await farmFactory.makePrismaFarm({ownerId: producer.id})
    const farm2 = await farmFactory.makePrismaFarm({ownerId: producer.id})

    await producerFarmFactory.makePrismaProducerFarm({
      farmId: farm1.id,
      producerId: producer.id,
    })

    await producerFarmFactory.makePrismaProducerFarm({
      farmId: farm2.id,
      producerId: producer.id,
    })

    const farm3 = await farmFactory.makePrismaFarm({ownerId: producer.id})

    const response = await request(app.getHttpServer())
      .put(`/producers/${producerId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New name',
        email: 'email@email.com',
        document: '48984114871',
        farms: [farm1.id.toString(), farm3.id.toString()],
      })

      if (response.statusCode !== 204) {
        console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
      }

    expect(response.statusCode).toBe(204)

    const producerOnDatabase = await prisma.producer.findFirst({
      where: {
        name: 'New name',
        email: 'email@email.com',
        document: '48984114871',
      },
    })

    expect(producerOnDatabase).toBeTruthy()

    const farmsOnDatabase = await prisma.farm.findMany({
      where: {
        ownerId: producerOnDatabase?.id,
      },
    })

    expect(farmsOnDatabase).toHaveLength(2)
    expect(farmsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: farm1.id.toString(),
        }),
        expect.objectContaining({
          id: farm3.id.toString(),
        }),
      ]),
    )
  })
})