import { FetchRecentProducersUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producers'

import { makeProducer } from 'test/factories/make-producer'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: FetchRecentProducersUseCase

describe('Fetch Recent Producers', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )
    
    sut = new FetchRecentProducersUseCase(inMemoryProducersRepository)
  })

  it('Should be able to fetch recent producers', async () => {
    await inMemoryProducersRepository.create(
      makeProducer({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryProducersRepository.create(
      makeProducer({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryProducersRepository.create(
      makeProducer({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.producers).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('Should be able to fetch paginated recent producers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryProducersRepository.create(makeProducer())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.producers).toHaveLength(2)
  })
})