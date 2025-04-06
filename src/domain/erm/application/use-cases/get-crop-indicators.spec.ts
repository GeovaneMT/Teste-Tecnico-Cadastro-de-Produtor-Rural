import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'

import { makeFarm } from 'test/factories/make-farms'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { makeCrop } from 'test/factories/make-crops'
import { makeFarmCrop } from 'test/factories/make-farm-crops'
import { makeProducer } from 'test/factories/make-producers'
import { StateCropIndicators } from '../../enterprise/entities/value-objects/state-crop-indicators'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository

let inMemoryProducersRepository: InMemoryProducersRepository
let sut: GetCropIndicatorsUseCase

describe('Get Crop Indicators', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    
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

    sut = new GetCropIndicatorsUseCase(inMemoryFarmsRepository)
  })

  it('should be able to fetch crop indicators', async () => {
    
    const newProducer = makeProducer({
      name: 'John Doe',
      email: 'john.doe@example',
    })

    await inMemoryProducersRepository.create(newProducer)

    const farm1 = makeFarm({ ownerId: newProducer.id })
    await inMemoryFarmsRepository.create(farm1)

    const farm2 = makeFarm({ ownerId: newProducer.id })
    await inMemoryFarmsRepository.create(farm2)

    const farm3 = makeFarm({ ownerId: newProducer.id })
    await inMemoryFarmsRepository.create(farm3)
    
    const crop1 = makeCrop({landId: farm1.id, ownerId: newProducer.id})
    await inMemoryCropsRepository.create(crop1)

    const crop2 = makeCrop({landId: farm2.id, ownerId: newProducer.id})
    await inMemoryCropsRepository.create(crop2)

    const crop3 = makeCrop({landId: farm3.id, ownerId: newProducer.id})
    await inMemoryCropsRepository.create(crop3)
    
    const result = await sut.execute()
    
    if (result.isLeft()) {
      throw new Error(result.value.message)
    }
    
    expect(result.value.indicators).toEqual([
      [
        [
          expect.any(StateCropIndicators),
        ],
      ],
      [
        [
          expect.any(StateCropIndicators),
        ],
      ],
      [
        [
          expect.any(StateCropIndicators),
        ],
      ],
    ]);
    
  })
})