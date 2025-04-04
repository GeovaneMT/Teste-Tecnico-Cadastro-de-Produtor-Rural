import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

import { makeProducer } from 'test/factories/make-producers'
import { makeProducerFarm } from 'test/factories/make-producer-farms'

import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: DeleteProducerUseCase

describe('Delete Producer', () => {
  beforeEach(() => {
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryCropsRepository = new InMemoryCropsRepository()

    inMemoryFarmsRepository = new InMemoryFarmsRepository(
      inMemoryCropsRepository, 
      inMemoryFarmCropsRepository, 
      inMemoryProducersRepository
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryFarmsRepository,
      inMemoryProducerFarmsRepository,
    )

    sut = new DeleteProducerUseCase(
      inMemoryProducersRepository,
    )
  })

  it('should be able to delete a producer', async () => {
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    inMemoryProducerFarmsRepository.items.push(
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('1'),
      }),
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      producerId: 'producer-1',
    })

    expect(inMemoryProducersRepository.items).toHaveLength(0)

    expect(inMemoryProducerFarmsRepository.items).toHaveLength(0)
    expect(inMemoryFarmsRepository.items).toHaveLength(0)

    expect(inMemoryFarmCropsRepository.items).toHaveLength(0)
    expect(inMemoryCropsRepository.items).toHaveLength(0)
  })
})