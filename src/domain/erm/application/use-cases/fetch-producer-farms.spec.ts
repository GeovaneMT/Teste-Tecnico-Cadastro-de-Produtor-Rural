import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-producer-farms'

import { makeProducer } from 'test/factories/make-producer'
import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: FetchProducerFarmsUseCase

describe('Fetch producer crops', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new FetchProducerFarmsUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to fetch producer farms', async () => {

    const producer = makeProducer({
      name: 'John Doe',
    }, new UniqueEntityID('producer-1'))

    inMemoryProducersRepository.create(producer)

    const farm1 = makeProducerFarm({
      producerId: producer.id,
    }, new UniqueEntityID('farm-1'))
    
    const farm2 = makeProducerFarm({
      producerId: producer.id,    
    }, new UniqueEntityID('farm-2'))

    const farm3 = makeProducerFarm({
      producerId: producer.id,
    }, new UniqueEntityID('farm-3'))

    inMemoryProducerFarmsRepository.items.push(farm1, farm2, farm3)
    
    const result = await sut.execute({
      producerId: 'producer-1',
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }
            
    expect(result.value.producerFarms).toHaveLength(3)

    expect(result.value.producerFarms).toHaveLength(3)

    expect(result.value.producerFarms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            producerId: expect.objectContaining({ value: 'producer-1' }),
          }),
          _id: farm1.id,
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            producerId: expect.objectContaining({ value: 'producer-1' }),
          }),
          _id: farm2.id,
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            producerId: expect.objectContaining({ value: 'producer-1' }),
          }),
          _id: farm3.id,
        }),
      ])
    )  

    })
    
  it('should be able to fetch paginated producer producers', async () => {
    
    const producer = makeProducer({
      name: 'John Doe',
    }, new UniqueEntityID('producer-1'))

    inMemoryProducersRepository.items.push(producer)

    for (let i = 1; i <= 22; i++) {
      const farm = makeProducerFarm({
        producerId: producer.id,
      }, new UniqueEntityID(`producer-1`))

      await inMemoryProducerFarmsRepository.create(farm)

      const crop = makeFarmCrop({
        farmId: farm.id,
      }, new UniqueEntityID(`crop-1`))

      await inMemoryFarmCropsRepository.create(crop)
    }

    const result = await sut.execute({
      producerId: 'producer-1',
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.producerFarms).toHaveLength(2)
  })
})