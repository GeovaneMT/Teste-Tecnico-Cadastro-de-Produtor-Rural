import request from 'supertest'
import { hash } from 'bcryptjs'

import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

import { AdminFactory } from 'test/factories/make-admin'

describe('Refresh (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)

    await app.init()
  })

  test('[POST] /token/refresh', async () => {
    await adminFactory.makePrismaAdmin({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const authResponse = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    if (authResponse.statusCode !== 201) {
      console.error('Unexpected response:', JSON.stringify(authResponse.body, null, 2))
    }

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw new Error('Cookies not found')
    }

    const response = await request(app.getHttpServer())
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send({
        email: 'johndoe@example.com',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refresh_token='),
      expect.stringContaining('Path=/;'),
    ])
  })
})
