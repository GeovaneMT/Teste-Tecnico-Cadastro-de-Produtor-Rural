import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { FetchProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-producer-farms'
import { makeProducerFarm } from 'test/factories/make-producer-farm'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { makeProducer } from 'test/factories/make-producer'

let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let sut: FetchProducerFarmsUseCase

describe('Fetch Producer Farms', () => {
  beforeEach(() => {
    inMemoryProducersRepository = new InMemoryProducersRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryProducersRepository,
    )
    sut = new FetchProducerFarmsUseCase(inMemoryProducerFarmsRepository)
  })

  it('should be able to fetch producer farms', async () => {
    const producer = makeProducer({ name: 'John Doe' })

    inMemoryProducersRepository.items.push(producer)

    const farm1 = makeProducerFarm({
      producerId: new UniqueEntityID('producer-1'),
      farmId: producer.id,
    })

    const farm2 = makeProducerFarm({
      producerId: new UniqueEntityID('producer-1'),
      farmId: producer.id,
    })

    const farm3 = makeProducerFarm({
      producerId: new UniqueEntityID('producer-1'),
      farmId: producer.id,
    })

    await inMemoryProducerFarmsRepository.create(farm1)
    await inMemoryProducerFarmsRepository.create(farm2)
    await inMemoryProducerFarmsRepository.create(farm3)

    const result = await sut.execute({
      producerId: 'producer-1',
      page: 1,
    })

    expect(result.value?.farms).toHaveLength(3)
    expect(result.value?.farms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          owner: 'John Doe',
          farmId: farm1.id,
        }),
        expect.objectContaining({
          owner: 'John Doe',
          farmId: farm2.id,
        }),
        expect.objectContaining({
          owner: 'John Doe',
          farmId: farm3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated producer farms', async () => {
    const producer = makeProducer({ name: 'John Doe' })

    inMemoryProducersRepository.items.push(producer)

    for (let i = 1; i <= 22; i++) {
      await inMemoryProducerFarmsRepository.create(
        makeProducerFarm({
          producerId: new UniqueEntityID('producer-1'),
          farmId: producer.id,
        }),
      )
    }

    const result = await sut.execute({
      producerId: 'producer-1',
      page: 2,
    })

    expect(result.value?.farms).toHaveLength(2)
  })
})