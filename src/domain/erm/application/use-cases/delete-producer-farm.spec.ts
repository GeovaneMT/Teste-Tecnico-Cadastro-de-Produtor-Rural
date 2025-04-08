import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DeleteProducerFarmUseCase } from '@/domain/erm/application/use-cases/delete-producer-farm'

import { makeProducerFarm } from 'test/factories/make-producer-farm'
import { makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: DeleteProducerFarmUseCase

describe('Delete producer farm', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new DeleteProducerFarmUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to delete a producer farm', async () => {
    const newProducerFarm = makeProducerFarm(
      {},
      new UniqueEntityID('farm-1'),
    )

    await inMemoryProducerFarmsRepository.create(newProducerFarm)

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: newProducerFarm.id,
      }, new UniqueEntityID('1')),
      makeFarmCrop({
        farmId: newProducerFarm.id,
      }, new UniqueEntityID('2')),
    )

    await sut.execute({
      producerFarmId: 'farm-1',
    })

    expect(inMemoryProducerFarmsRepository.items).toHaveLength(0)
    expect(inMemoryFarmCropsRepository.items).toHaveLength(0)
  })
})