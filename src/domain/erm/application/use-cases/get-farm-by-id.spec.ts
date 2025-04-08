import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { GetFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-by-id'

import { makeCrop } from 'test/factories/make-crop'
import { makeFarm } from 'test/factories/make-farm'
import { FarmCropFactory, makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { makeProducer } from 'test/factories/make-producer'
import { c } from 'vitest/dist/reporters-5f784f42'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: GetFarmByIdUseCase

describe('Get Farm By Id', () => {
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
    sut = new GetFarmByIdUseCase(inMemoryFarmsRepository)
  })

  it('should be able to get a farm by id', async () => {

    const newProducer = makeProducer({
      name: 'John Doe',
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

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: farm.id,
        cropId: crop.id,
      }),
    )

    const result = await sut.execute({
      id: farm.id.toString(), 
    })

    if (result.isLeft()) {
      throw result.value
    }
    
    expect(result.value.farm.farmId).toBe(farm.id)
    expect(result.value.farm.ownerId).toBe(farm.ownerId)

    expect(result.value.farm.name).toBe(farm.name)
    expect(result.value.farm.city).toBe(farm.city)
    expect(result.value.farm.state).toBe(farm.state)
    
    expect(result.value.farm.farmArea.getValue()).toBe(farm.farmArea.getValue())
    expect(result.value.farm.vegetationArea).toBe(farm.vegetationArea)
    expect(result.value.farm.agriculturalArea).toBe(farm.agriculturalArea)

    expect(result.value.farm.crops[0]).toBe(crop)

  })
})