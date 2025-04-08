import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { DeleteProducerUseCase } from '@/domain/erm/application/use-cases/delete-producer'

import { makeProducer } from 'test/factories/make-producer'
import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: DeleteProducerUseCase

describe('Delete Producer', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )
    
    sut = new DeleteProducerUseCase(
      inMemoryProducersRepository,
    )
  })

  it('Should be able to delete a producer and its associated farms and crops', async () => {
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    const farm1 = makeProducerFarm({
      producerId: newProducer.id,
    }, new UniqueEntityID('1'))
    
    const farm2 = makeProducerFarm({
      producerId: newProducer.id,
    }, new UniqueEntityID('2'))

    inMemoryProducerFarmsRepository.items.push(farm1, farm2)
    
    const crop1 = makeFarmCrop({
      farmId: farm1.id,
    }, new UniqueEntityID('1'))
    
    const crop2 = makeFarmCrop({
      farmId: farm1.id,
    }, new UniqueEntityID('2'))

    const crop3 = makeFarmCrop({
      farmId: farm2.id,
    }, new UniqueEntityID('3'))

    const crop4 = makeFarmCrop({
      farmId: farm2.id,
    }, new UniqueEntityID('4'))

    inMemoryFarmCropsRepository.items.push(crop1, crop2, crop3, crop4)

    await sut.execute({
      producerId: 'producer-1',
    })

    expect(inMemoryProducersRepository.items).toHaveLength(0)
    expect(inMemoryProducerFarmsRepository.items).toHaveLength(0)
    expect(inMemoryFarmCropsRepository.items).toHaveLength(0)
  })
})