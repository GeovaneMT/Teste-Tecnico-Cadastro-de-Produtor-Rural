import request from 'supertest'

import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admin'
import { JwtService } from '@nestjs/jwt'

describe('Create Account (E2E)', () => {
  let jwt: JwtService
  let app: INestApplication
  let prisma: PrismaService
  
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
      ],
    }).compile()
    
    jwt = moduleRef.get(JwtService)
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    
    adminFactory = moduleRef.get(AdminFactory)
    
    await app.init()
  })

  test('[POST] /accounts', async () => {
    const user = await adminFactory.makePrismaAdmin()
    const accessToken = jwt.sign({
      sub: user.id.toString(),
      role: user.role
    })
    
    const response = await request(app.getHttpServer())
    .post('/accounts')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})