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
      inMemoryFarmsRepository,
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

    const farm = makeFarm({
      ownerId: newProducer.id,
      name: 'Some farm',
      city: 'Some city',
      state: 'Some state',

      farmArea: '100',
      vegetationArea: '10',
      agriculturalArea: '80',
    })

    inMemoryFarmsRepository.items.push(farm)

    const crop = makeCrop({
      ownerId: newProducer.id,
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

    expect(result.value).toMatchObject({
      producer: expect.objectContaining({
        name: newProducer.name,
        farms: [
          expect.objectContaining({
            name: farm.name,
          }),
        ],
      }),
    })
  })
})