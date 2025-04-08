import { CreateProducerFarmUseCase } from '@/domain/erm/application/use-cases/create-producer-farm'
import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: CreateProducerFarmUseCase

describe('Create producer farm', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new CreateProducerFarmUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to create a new farm', async () => {

    const result = await sut.execute({
      producerId: '1',

      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',

      farmArea: '10',
      vegetationArea: '4',
      agriculturalArea: '4',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      producerFarm: inMemoryProducerFarmsRepository.items[0],
    })
  })
})