import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { GetProducerFarmByIdUseCase } from '@/domain/erm/application/use-cases/get-producer-farm-by-id'

import { makeProducer } from 'test/factories/make-producer'
import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: GetProducerFarmByIdUseCase

describe('Get Producer Farm By Id', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )    

    sut = new GetProducerFarmByIdUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to get a producer farm by id', async () => {

    const newProducer = makeProducer({
      name: 'John Doe',
    })

    await inMemoryProducersRepository.create(newProducer)

    const farmAreaCreateData = {
      farmArea: 100, 
      vegetationArea: 10,
      agriculturalArea: 80, 
    }
    
    const producerFarm = makeProducerFarm({
      producerId: newProducer.id,

      name: 'Some farm',
      city: 'Some city',
      state: 'SP',

      farmArea: FarmArea.create(farmAreaCreateData),
      vegetationArea: farmAreaCreateData.vegetationArea.toString(),
      agriculturalArea: farmAreaCreateData.agriculturalArea.toString(),
    })

    inMemoryProducerFarmsRepository.items.push(producerFarm)

    const farmCrop = makeFarmCrop({
      farmId: producerFarm.id,
      type: 'SOYBEANS',
      description: 'Some description',
    })

    inMemoryFarmCropsRepository.items.push(farmCrop)

    const result = await sut.execute({
      farmId: producerFarm.id.toString(), 
    })

    if (result.isLeft()) {
      throw result.value
    }
    
    expect(result.value.producerFarmDetails.ownerId).toBe(producerFarm.producerId)
    
    expect(result.value.producerFarmDetails.name).toBe(producerFarm.name)
    expect(result.value.producerFarmDetails.city).toBe(producerFarm.city)
    expect(result.value.producerFarmDetails.state).toBe(producerFarm.state)
    
    expect(result.value.producerFarmDetails.farmArea.getValue()).toBe(producerFarm.farmArea.getValue())
    expect(result.value.producerFarmDetails.vegetationArea).toBe(producerFarm.vegetationArea)
    expect(result.value.producerFarmDetails.agriculturalArea).toBe(producerFarm.agriculturalArea)
    
    expect(result.value.producerFarmDetails.farmCrops[0]).toBe(farmCrop)
    expect(result.value.producerFarmDetails.farmCrops[0].id).toBe(farmCrop.id)

  })
})