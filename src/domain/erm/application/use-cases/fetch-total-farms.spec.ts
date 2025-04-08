import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'

import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: FetchTotalFarmsUseCase

describe('Fetch Recent Producers', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new FetchTotalFarmsUseCase(inMemoryProducerFarmsRepository)
  })

  it('should be able to fetch total farms', async () => {
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    
    const result = await sut.execute()
        
    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value).toEqual({ totalFarms: 3 })
  })
})