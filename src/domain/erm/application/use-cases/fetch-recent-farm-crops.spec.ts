import { FetchRecentFarmCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-farm-crops'

import { makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: FetchRecentFarmCropsUseCase

describe('Fetch Recent farm crops', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()

    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )    
    sut = new FetchRecentFarmCropsUseCase(inMemoryFarmCropsRepository)
  })

  it('Should be able to fetch recent farm crops', async () => {
    await inMemoryFarmCropsRepository.create(
      makeFarmCrop({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryFarmCropsRepository.create(
      makeFarmCrop({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryFarmCropsRepository.create(
      makeFarmCrop({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.farmCrops).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('Should be able to fetch paginated recent farm crops', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryFarmCropsRepository.create(makeFarmCrop())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.farmCrops).toHaveLength(2)
  })
})