import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ProducerFarmFactory } from 'test/factories/make-producer-farm'
import { ProducerFactory } from 'test/factories/make-producer'
import { AdminFactory } from 'test/factories/make-admin'

describe('Prisma Producers Repository (E2E)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let producerFactory: ProducerFactory
  let producerFarmFactory: ProducerFarmFactory
  let cacheRepository: CacheRepository
  let producersRepository: ProducersRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        AdminFactory,
        ProducerFactory,
        ProducerFarmFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    producerFactory = moduleRef.get(ProducerFactory)
    producerFarmFactory = moduleRef.get(ProducerFarmFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    producersRepository = moduleRef.get(ProducersRepository)

    await app.init()
  })

  it('should cache producer details', async () => {
    const producer = await producerFactory.makePrismaProducer()

    await producerFarmFactory.makePrismaProducerFarm({producerId: producer.id})

    const email = producer.email

    const producerDetails = await producersRepository.findDetailsByEmail(email)

    const cached = await cacheRepository.get(`producer:${email}:details`)

    expect(cached).toEqual(JSON.stringify(producerDetails))
  })

  it('should return cached producer details on subsequent calls', async () => {
    const producer = await producerFactory.makePrismaProducer()

    await producerFarmFactory.makePrismaProducerFarm({producerId: producer.id})

    const email = producer.email

    await cacheRepository.set(
      `producer:${email}:details`,
      JSON.stringify({ empty: true }),
    )

    const producerDetails = await producersRepository.findDetailsByEmail(email)

    expect(producerDetails).toEqual({ empty: true })
  })

  it('should reset producer details cache when saving the producer', async () => {

    const producer = await producerFactory.makePrismaProducer()

    await producerFarmFactory.makePrismaProducerFarm({producerId: producer.id})

    const email = producer.email

    await cacheRepository.set(
      `producer:${email}:details`,
      JSON.stringify({ empty: true }),
    )

    await producersRepository.save(producer)

    const cached = await cacheRepository.get(`producer:${email}:details`)

    expect(cached).toBeNull()
  })
})