import { FetchTotalAreaUseCase } from '@/domain/erm/application/use-cases/fetch-total-area'

import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: FetchTotalAreaUseCase

describe('Fetch Recent Producers', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new FetchTotalAreaUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to fetch total area', async () => {
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    await inMemoryProducerFarmsRepository.create(makeProducerFarm())
    
    const result = await sut.execute()
        
    if (result.isLeft()) {
      throw new Error(result.value.message)
    }
    
    expect(result.value.totalArea).toBeGreaterThanOrEqual(0)
  })
})