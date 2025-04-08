import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteFarmCropUseCase } from '@/domain/erm/application/use-cases/delete-farm-crop'

import { makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: DeleteFarmCropUseCase

describe('Delete farm crop', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )
    
    sut = new DeleteFarmCropUseCase(inMemoryFarmCropsRepository)
  })

  it('Should be able to delete a farm crop', async () => {
    const newFarmCrop = makeFarmCrop(
      {},
      new UniqueEntityID('crop-1'),
    )

    await inMemoryFarmCropsRepository.create(newFarmCrop)

    await sut.execute({
      farmCropId: 'crop-1',
    })

    expect(inMemoryFarmCropsRepository.items).toHaveLength(0)

  })
})