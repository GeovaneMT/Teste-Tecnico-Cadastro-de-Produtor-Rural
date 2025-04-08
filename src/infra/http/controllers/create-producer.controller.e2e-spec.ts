import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { FarmFactory } from 'test/factories/make-farm'
import { ProducerFactory } from 'test/factories/make-producer'

describe('Create producer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let farmFactory: FarmFactory
  let producerFactory: ProducerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FarmFactory, ProducerFactory, AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    farmFactory = moduleRef.get(FarmFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /producers', async () => {

    const user = await adminFactory.makePrismaAdmin()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    // const producer = await producerFactory.makePrismaProducer()
    // const farm1 = await farmFactory.makePrismaFarm({ownerId: producer.id})
    // const farm2 = await farmFactory.makePrismaFarm({ownerId: producer.id})

    const response = await request(app.getHttpServer())
      .post('/producers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New producer',
        email: 'Test@email.com',
        document: '48984114871',
        // document: Document.generateValidDocument().getValue(),
        farms: [],
        // farms: [farm1.id.toString(), farm2.id.toString()],
      })

    if (response.statusCode !== 201) {
      console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
    }
      
    expect(response.statusCode).toBe(201)

    const producerOnDatabase = await prisma.producer.findFirst({
      where: {
        email: 'Test@email.com',
      },
    })

    expect(producerOnDatabase).toBeTruthy()

    const farmsOnDatabase = await prisma.farm.findMany({
      where: {
        ownerId: producerOnDatabase?.id,
      },
    })

    expect(farmsOnDatabase).toHaveLength(0)
    // expect(farmsOnDatabase).toHaveLength(2)
  })
})