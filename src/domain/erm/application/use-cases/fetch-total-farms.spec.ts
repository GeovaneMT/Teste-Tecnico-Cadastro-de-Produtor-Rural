import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'

import { makeFarm } from 'test/factories/make-farm'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository

let inMemoryProducersRepository: InMemoryProducersRepository
let sut: FetchTotalFarmsUseCase

describe('Fetch Recent Producers', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    
    inMemoryFarmsRepository = new InMemoryFarmsRepository(
      inMemoryCropsRepository, 
      inMemoryFarmCropsRepository, 
      inMemoryProducersRepository
    )
    
    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryCropsRepository,
      inMemoryFarmsRepository,
      inMemoryFarmCropsRepository,
      inMemoryProducerFarmsRepository,
    )

    sut = new FetchTotalFarmsUseCase(inMemoryFarmsRepository)
  })

  it('should be able to fetch total farms', async () => {
    await inMemoryFarmsRepository.create(makeFarm())
    await inMemoryFarmsRepository.create(makeFarm())
    await inMemoryFarmsRepository.create(makeFarm())
    
    const result = await sut.execute()
        
    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value).toEqual({ totalFarms: 3 })
  })
})