import request from 'supertest'

import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { AdminFactory } from 'test/factories/make-admin'
import { ProducerFactory } from 'test/factories/make-producer'
import { CropFactory } from 'test/factories/make-crop'
import { FarmFactory } from 'test/factories/make-farm'

describe('Delete producer (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmFactory: FarmFactory
  let cropFactory: CropFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, ProducerFactory, FarmFactory, CropFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    farmFactory = moduleRef.get(FarmFactory)
    cropFactory = moduleRef.get(CropFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /producers/:producerId/farms/:Id', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const producer = await producerFactory.makePrismaProducer()

    const producerId = producer.id.toString()

    const farm = await farmFactory.makePrismaFarm({
      ownerId: producer.id,
    })

    const farmId = farm.id.toString()

    const crop = await cropFactory.makePrismaCrop({
      landId: farm.id,
    })

    const cropId = crop.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/producers/${producerId}/farms/${farmId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const farmOnDatabase = await prisma.farm.findUnique({
      where: {
        id: farmId,
      },
    })

    expect(farmOnDatabase).toBeNull()

    const cropOnDatabase = await prisma.crop.findUnique({
      where: {
        id: cropId,
      },
    })

    expect(cropOnDatabase).toBeNull()
  })
})