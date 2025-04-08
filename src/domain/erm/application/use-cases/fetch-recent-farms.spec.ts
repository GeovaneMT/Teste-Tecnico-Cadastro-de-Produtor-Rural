import { FetchRecentFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farms'

import { makeFarm } from 'test/factories/make-farm'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: FetchRecentFarmsUseCase

describe('Fetch Recent Farms', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryCropsRepository,
      inMemoryFarmsRepository,
      inMemoryFarmCropsRepository,
      inMemoryProducerFarmsRepository,
    )    
    
    inMemoryFarmsRepository = new InMemoryFarmsRepository(
      inMemoryCropsRepository, 
      inMemoryFarmCropsRepository, 
      inMemoryProducersRepository
    )
    
    sut = new FetchRecentFarmsUseCase(inMemoryFarmsRepository)
  })

  it('should be able to fetch recent farms', async () => {
    await inMemoryFarmsRepository.create(
      makeFarm({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryFarmsRepository.create(
      makeFarm({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryFarmsRepository.create(
      makeFarm({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.farms).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent farms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryFarmsRepository.create(makeFarm())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.farms).toHaveLength(2)
  })
})