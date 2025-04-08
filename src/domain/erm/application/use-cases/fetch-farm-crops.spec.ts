import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchProducerFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-farm-crops'

import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducer } from 'test/factories/make-producer'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: FetchProducerFarmsUseCase

describe('Fetch farm crops', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()

    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository
    )

    sut = new FetchProducerFarmsUseCase(inMemoryFarmCropsRepository)
  })

  it('Should be able to fetch farm crops', async () => {
    const producer = makeProducer()

    inMemoryProducersRepository.items.push(producer)

    const farm = makeProducerFarm({
      name: 'John Doe',
      producerId: producer.id,
    }, new UniqueEntityID('farm-1'))

    inMemoryProducerFarmsRepository.create(farm)
    const crop1 = makeFarmCrop({
      farmId: farm.id,
    }, new UniqueEntityID('crop-1'))
    
    const crop2 = makeFarmCrop({
      farmId: farm.id,    
    }, new UniqueEntityID('crop-2'))

    const crop3 = makeFarmCrop({
      farmId: farm.id,
    }, new UniqueEntityID('crop-3'))

    inMemoryFarmCropsRepository.items.push(crop1, crop2, crop3)
    
    const result = await sut.execute({
      landId: 'farm-1',
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }
            
    expect(result.value.farmCrops).toHaveLength(3)

    expect(result.value.farmCrops).toHaveLength(3)

    expect(result.value.farmCrops).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            farmId: expect.objectContaining({ value: 'farm-1' }),
          }),
          _id: crop1.id,
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            farmId: expect.objectContaining({ value: 'farm-1' }),
          }),
          _id: crop2.id,
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            farmId: expect.objectContaining({ value: 'farm-1' }),
          }),
          _id: crop3.id,
        }),
      ])
    )  

    })
    
  it('should be able to fetch paginated producer farms', async () => {
    const producer = makeProducer({ name: 'John Doe' })

    inMemoryProducersRepository.items.push(producer)

    for (let i = 1; i <= 22; i++) {
      const farm = makeProducerFarm({
        producerId: producer.id,
      }, new UniqueEntityID(`farm-1`))

      await inMemoryProducerFarmsRepository.create(farm)

      const crop = makeFarmCrop({
        farmId: farm.id,
      }, new UniqueEntityID(`crop-1`))

      await inMemoryFarmCropsRepository.create(crop)
    }

    const result = await sut.execute({
      landId: 'farm-1',
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.farmCrops).toHaveLength(2)
  })
})