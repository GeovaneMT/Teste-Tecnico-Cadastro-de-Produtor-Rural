import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFactory } from 'test/factories/make-producer'
import { NotificationFactory } from 'test/factories/make-notification'

describe('Read notification (E2E)', () => {
  let jwt: JwtService
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let notificationFactory: NotificationFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, ProducerFactory, NotificationFactory],
    }).compile()

    jwt = moduleRef.get(JwtService)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    producerFactory = moduleRef.get(ProducerFactory)
    adminFactory = moduleRef.get(AdminFactory)
    notificationFactory = moduleRef.get(NotificationFactory)

    await app.init()
  })

  test('[PATCH] /notifications/:notificationId/read', async () => {
    const user = await adminFactory.makePrismaAdmin({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer({
      name: 'John Doe',
    })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: producer.id,
    })

    const notificationId = notification.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read/${producer.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: {
        recipientId: user.id.toString(),
      },
    })

    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
})