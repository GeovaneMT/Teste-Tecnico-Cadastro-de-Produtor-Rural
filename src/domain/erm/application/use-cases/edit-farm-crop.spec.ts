import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { EditFarmCropUseCase } from '@/domain/erm/application/use-cases/edit-farm-crop'

import { makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: EditFarmCropUseCase

describe('Edit Crop', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )
    
    sut = new EditFarmCropUseCase(
      inMemoryFarmCropsRepository,
    )
  })

  it('Should be able to edit a farm crop', async () => {
    const newFarmCrop = makeFarmCrop(
      {},
      new UniqueEntityID('crop-1'),
    )

    await inMemoryFarmCropsRepository.create(newFarmCrop)

    const result = await sut.execute({
      farmCropId: newFarmCrop.id.toValue(),
      landId: newFarmCrop.farmId.toValue(),
      
      type: 'COFFEE',
      description: 'TEST DESCRIPTION',
    })

    if (result.isLeft()) {
      throw result.value
    }

    expect(inMemoryFarmCropsRepository.items[0]).toMatchObject({
      type: 'COFFEE',
      description: 'TEST DESCRIPTION',
    })
  })
})