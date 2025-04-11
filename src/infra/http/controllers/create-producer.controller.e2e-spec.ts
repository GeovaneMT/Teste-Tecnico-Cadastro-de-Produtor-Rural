import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFarmFactory } from 'test/factories/make-producer-farm'
import { ProducerFactory } from 'test/factories/make-producer'

describe('Create a producer (E2E)', () => {
  let jwt: JwtService
  let app: INestApplication
  let prisma: PrismaService

  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let producerFarmFactory: ProducerFarmFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    app = moduleRef.createNestApplication()
    
    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)

    await app.init()
  })

  test('[POST] /producers', async () => {

    const user = await adminFactory.makePrismaAdmin()
    const accessToken = jwt.sign({
      sub: user.id.toString(),
      role: user.role
    })
    const response = await request(app.getHttpServer())
      .post('/producers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New producer',
        email: 'Test@email.com',
        document: '48984114871',
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
  })
})