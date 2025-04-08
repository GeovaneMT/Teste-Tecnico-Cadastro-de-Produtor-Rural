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
import { CropFactory } from 'test/factories/make-crop'
import { FarmCropFactory } from 'test/factories/make-farm-crop'

describe('Edit farm (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let farmFactory: FarmFactory
  let producerFarmFactory: ProducerFarmFactory
  let cropFactory: CropFactory
  let farmCropFactory: FarmCropFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        FarmFactory,
        CropFactory,
        FarmCropFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    farmFactory = moduleRef.get(FarmFactory)
    cropFactory = moduleRef.get(CropFactory)
    farmCropFactory = moduleRef.get(FarmCropFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /producers/:producerId/farms/:farmId', async () => {
    const user = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: user.id.toString() })
    
    const producer = await producerFactory.makePrismaProducer()
    const producerId = producer.id.toString()
    
    const farm = await farmFactory.makePrismaFarm({ownerId: producer.id})
    const farmId = farm.id.toString()

    await producerFarmFactory.makePrismaProducerFarm({
      farmId: farm.id,
      producerId: producer.id,
    })

    const crop1 = await cropFactory.makePrismaCrop({landId: farm.id})
    const crop2 = await cropFactory.makePrismaCrop({landId: farm.id})

    await farmCropFactory.makePrismaFarmCrop({
      cropId: crop1.id,
      farmId: farm.id,
    })

    await farmCropFactory.makePrismaFarmCrop({
      cropId: crop2.id,
      farmId: farm.id,
    })

    const crop3 = await cropFactory.makePrismaCrop({landId: farm.id})

    const response = await request(app.getHttpServer())
      .put(`/farms/${farmId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: producer.id.toString(),

        name: 'Test Farm Updated',
        city: 'City Updated',
        state: 'SP',
        farmArea: 100,
        vegetationArea: 80,
        agriculturalArea: 20,
        crops: [crop1.id.toString(), crop3.id.toString()],
      })

      if (response.statusCode !== 204) {
        console.error('Unexpected response:', JSON.stringify(response.body, null, 2))
      }

    expect(response.statusCode).toBe(204)

    const farmOnDatabase = await prisma.farm.findFirst({
      where: {
        ownerId: producer.id.toString(),
        name: 'Test Farm Updated',
        city: 'City Updated',
        state: 'SP',

        farmArea: '100',
        vegetationArea: '80',
        agriculturalArea: '20',
      },
    })

    expect(farmOnDatabase).toBeTruthy()

    const cropsOnDatabase = await prisma.crop.findMany({
      where: {
        landId: farmOnDatabase?.id,
      },
    })

    expect(cropsOnDatabase).toHaveLength(2)
    expect(cropsOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: crop1.id.toString(),
        }),
        expect.objectContaining({
          id: crop3.id.toString(),
        }),
      ]),
    )
  })
})