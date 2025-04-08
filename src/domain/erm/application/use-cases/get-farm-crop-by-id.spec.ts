import { GetFarmCropByIdUseCase } from '@/domain/erm/application/use-cases/get-farm-crop-by-id'

import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: GetFarmCropByIdUseCase

describe('Get Crop By Id', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )    
    
    sut = new GetFarmCropByIdUseCase(inMemoryFarmCropsRepository)
  })

  it('Should be able to get a farm farmCrop by id', async () => {

    const newProducerFarm = makeProducerFarm()
    
    const farmCrop = makeFarmCrop({
      farmId: newProducerFarm.id,
      type: 'SOYBEANS',
      description: 'Some description',
    })

    inMemoryFarmCropsRepository.items.push(farmCrop)

    const result = await sut.execute({
      id: farmCrop.id.toString(),
    })

    if (result.isLeft()) {
      throw result.value
    }
    
    expect(result.value.farmCrop.id).toBe(farmCrop.id)
    expect(result.value.farmCrop.farmId).toBe(newProducerFarm.id)

    expect(result.value.farmCrop.type).toBe(farmCrop.type)
    expect(result.value.farmCrop.description).toBe(farmCrop.description)
    
  })
})