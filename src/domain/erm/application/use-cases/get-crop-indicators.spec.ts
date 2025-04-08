import { GetCropIndicatorsUseCase } from '@/domain/erm/application/use-cases/get-crop-indicators'

import { makeProducer } from 'test/factories/make-producer'
import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: GetCropIndicatorsUseCase

describe('Get Crop Indicators', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )    

    sut = new GetCropIndicatorsUseCase(inMemoryProducerFarmsRepository)
  })

  it('should be able to fetch crop indicators', async () => {
    
    const newProducer = makeProducer({
      name: 'John Doe',
      email: 'john.doe@example',
    })

    await inMemoryProducersRepository.create(newProducer)

    const farm1 = makeProducerFarm({ producerId: newProducer.id })
    await inMemoryProducerFarmsRepository.create(farm1)

    const farm2 = makeProducerFarm({ producerId: newProducer.id })
    await inMemoryProducerFarmsRepository.create(farm2)

    const farm3 = makeProducerFarm({ producerId: newProducer.id })
    await inMemoryProducerFarmsRepository.create(farm3)
    
    const crop1 = makeFarmCrop({farmId: farm1.id})
    await inMemoryFarmCropsRepository.create(crop1)

    const crop2 = makeFarmCrop({farmId: farm2.id})
    await inMemoryFarmCropsRepository.create(crop2)

    const crop3 = makeFarmCrop({farmId: farm3.id})
    await inMemoryFarmCropsRepository.create(crop3)
    
    const result = await sut.execute()
    
    if (result.isLeft()) {
      throw new Error(result.value.message)
    }
    
    expect(result.value.cropsByState).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            state: expect.any(String),
            cropTypesWithQuantity: expect.arrayContaining([
              expect.objectContaining({
                cropType: expect.any(String),
                total: 1,
              }),
            ]),
          }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            state: expect.any(String),
            cropTypesWithQuantity: expect.arrayContaining([
              expect.objectContaining({
                cropType: expect.any(String),
                total: 1,
              }),
            ]),
          }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({
            state: expect.any(String),
            cropTypesWithQuantity: expect.arrayContaining([
              expect.objectContaining({
                cropType: expect.any(String),
                total: 1,
              }),
            ]),
          }),
        }),
      ])
    )
    
  })
})