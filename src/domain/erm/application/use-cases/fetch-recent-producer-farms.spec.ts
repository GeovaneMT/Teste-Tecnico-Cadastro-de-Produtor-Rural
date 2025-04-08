import { FetchRecentProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-producer-farms'

import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: FetchRecentProducerFarmsUseCase

describe('Fetch Recent producer farms', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()

    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )    
    sut = new FetchRecentProducerFarmsUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to fetch recent producer farms', async () => {
    await inMemoryProducerFarmsRepository.create(
      makeProducerFarm({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryProducerFarmsRepository.create(
      makeProducerFarm({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryProducerFarmsRepository.create(
      makeProducerFarm({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.producerFarms).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('Should be able to fetch paginated recent farm crops', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.producerFarms).toHaveLength(2)
  })
})