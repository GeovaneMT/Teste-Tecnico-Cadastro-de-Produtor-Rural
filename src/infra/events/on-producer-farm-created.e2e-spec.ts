import request from 'supertest'
import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

import { waitFor } from 'test/utils/wait-for'
import { AdminFactory } from 'test/factories/make-admin'

describe('On producer farm created (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send a notification when producer is created', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    await request(app.getHttpServer())
      .post('/producers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New producer',
        email: 'Test@email.com',
        document: Document.generateValidDocument().getValue(),
      })
      
      const producer = await request(app.getHttpServer())
        .get('/producers/Test@email.com')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()

      if (producer.statusCode !== 200) {
        console.error('Unexpected response:', JSON.stringify(producer.body, null, 2))
      }
      
      await request(app.getHttpServer())
        .post('/farms')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          producerId: producer.body.id.toString(),
  
          name: 'New farm',
          city: 'City',
          state: 'SP',

          farmArea: 100,
          vegetationArea: 80,
          agriculturalArea: 20,
        })

      const farm = await request(app.getHttpServer())
        .get(`/farms/${producer.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()

      if (producer.statusCode !== 200) {
        console.error('Unexpected response:', JSON.stringify(producer.body, null, 2))
      }
        
    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: farm.body.farm.id,
        },
      })

      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})