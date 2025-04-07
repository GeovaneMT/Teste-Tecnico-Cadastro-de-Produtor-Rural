import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

import { makeCrop } from 'test/factories/make-crops'
import { makeFarm } from 'test/factories/make-farms'
import { makeProducer } from 'test/factories/make-producers'
import { makeProducerFarm } from 'test/factories/make-producer-farms'

import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { makeFarmCrop } from 'test/factories/make-farm-crops'

let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: GetProducerByEmailUseCase

describe('Get Producer By Email', () => {
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
      inMemoryCropsRepository,
      inMemoryFarmsRepository,
      inMemoryFarmCropsRepository,
      inMemoryProducerFarmsRepository,
    )
    
    sut = new GetProducerByEmailUseCase(inMemoryProducersRepository)
  })

  it('should be able to get a producer by email', async () => {

    const newProducer = makeProducer({
      name: 'John Doe',
      email: 'john.doe@example',
    })

    await inMemoryProducersRepository.create(newProducer)

    const farmAreaCreateData = {
      farmArea: 100, 
      vegetationArea: 10,
      agriculturalArea: 80, 
    }
    
    const farm = makeFarm({
      ownerId: newProducer.id,
      name: 'Some farm',
      city: 'Some city',
      state: 'SP',

      farmArea: FarmArea.create(farmAreaCreateData),
      vegetationArea: farmAreaCreateData.vegetationArea.toString(),
      agriculturalArea: farmAreaCreateData.agriculturalArea.toString(),
    })

    inMemoryFarmsRepository.items.push(farm)

    const crop = makeCrop({
      landId: farm.id,
      type: 'SOYBEANS',
      description: 'Some description',
    })

    inMemoryCropsRepository.items.push(crop)

    inMemoryProducerFarmsRepository.items.push(
      makeProducerFarm({
        farmId: farm.id,
        producerId: newProducer.id,
      }),
    )

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: farm.id,
        cropId: crop.id,
      }),
    )

    const result = await sut.execute({
      email: 'john.doe@example',
    })

    if (result.isLeft()) {
      throw result.value
    }

    expect(result.value.producer.name).toBe(newProducer.name)
    expect(result.value.producer.email).toBe(newProducer.email)
    expect(result.value.producer.producerId).toBe(newProducer.id)
    expect(result.value.producer.document).toBe(newProducer.document)

    expect(result.value.producer.farmsDetails).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            name: farm.name,
            city: farm.city,
            state: farm.state,
          }),
        }),
      ]),
    )

    expect(result.value.producer.farmsDetails[0].crops).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            type: crop.type,
            landId: farm.id,
            description: crop.description,
          }),
        }),
      ]),
    )

  })
})