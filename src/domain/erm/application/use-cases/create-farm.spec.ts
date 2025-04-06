import { CreateFarmUseCase } from '@/domain/erm/application/use-cases/create-farm'

import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: CreateFarmUseCase

describe('Create Farm', () => {
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

    sut = new CreateFarmUseCase(inMemoryFarmsRepository)
  })

  it('should be able to create a new farm with a crop', async () => {

    const result = await sut.execute({
      ownerId: '1',
      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',

      farmArea: '10 ',
      vegetationArea: '4',
      agriculturalArea: '4',

      cropsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      farm: inMemoryFarmsRepository.items[0],
    })
  })
})