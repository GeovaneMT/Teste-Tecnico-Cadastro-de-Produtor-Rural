import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DeleteFarmUseCase } from '@/domain/erm/application/use-cases/delete-farm'

import { makeFarm } from 'test/factories/make-farms'
import { makeFarmCrop } from 'test/factories/make-farm-crops'

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

let sut: DeleteFarmUseCase

describe('Delete Farm', () => {
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

    sut = new DeleteFarmUseCase(inMemoryFarmsRepository)
  })

  it('should be able to delete a farm', async () => {
    const newFarm = makeFarm(
      {},
      new UniqueEntityID('farm-1'),
    )

    await inMemoryFarmsRepository.create(newFarm)

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('1'),
      }),
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      farmId: 'farm-1',
    })

    expect(inMemoryFarmsRepository.items).toHaveLength(0)

    expect(inMemoryFarmCropsRepository.items).toHaveLength(0)
    expect(inMemoryCropsRepository.items).toHaveLength(0)
  })
})