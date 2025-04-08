import { randomUUID } from 'node:crypto'

import { CreateFarmCropUseCase } from '@/domain/erm/application/use-cases/create-farm-crop'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: CreateFarmCropUseCase

describe('Create farm crop', () => {
  beforeEach(() => {
    
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )
    
    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )

    sut = new CreateFarmCropUseCase(inMemoryFarmCropsRepository)
  })

  it('Should be able to create a new farm crop', async () => {

    const result = await sut.execute({
      farmId: randomUUID(),
      type: 'SOYBEANS',
      description: 'Crop description',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      farmCrop: inMemoryFarmCropsRepository.items[0],
    })
  })
})