import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { GetProducerByEmailUseCase } from '@/domain/erm/application/use-cases/get-producer-by-email'

import { makeFarmCrop } from 'test/factories/make-farm-crop'
import { makeProducer } from 'test/factories/make-producer'
import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: GetProducerByEmailUseCase

describe('Get Producer By Email', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )    
    
    sut = new GetProducerByEmailUseCase(inMemoryProducersRepository)
  })

  it('Should be able to get a producer by email', async () => {

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
            name: producerFarm.name,
            city: producerFarm.city,
            state: producerFarm.state,
          }),
        }),
      ]),
    )

    expect(result.value.producer.farmsDetails[0].farmCrops).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            farmId: producerFarm.id,
            
            type: farmCrop.type,
            description: farmCrop.description,
          }),
        }),
      ]),
    )

  })
})