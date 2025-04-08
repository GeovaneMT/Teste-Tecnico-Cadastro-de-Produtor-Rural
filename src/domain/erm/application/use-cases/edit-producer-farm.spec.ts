import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { EditProducerFarmUseCase } from '@/domain/erm/application/use-cases/edit-producer-farm'

import { makeProducerFarm } from 'test/factories/make-producer-farm'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: EditProducerFarmUseCase

describe('Edit producer farm', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new EditProducerFarmUseCase(inMemoryProducerFarmsRepository)
  })

  it('Should be able to edit a producer farm', async () => {
    const newProducerFarm = makeProducerFarm(
      {},
      new UniqueEntityID('farm-1'),
    )

    await inMemoryProducerFarmsRepository.create(newProducerFarm)

    const result = await sut.execute({
      producerFarmId: newProducerFarm.id.toValue(),
      producerId: newProducerFarm.producerId.toValue(),
      
      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',

      farmArea: FarmArea.create({ farmArea: 10, agriculturalArea: 4, vegetationArea: 4 }),
      vegetationArea: '4',
      agriculturalArea: '4',
    })

    if (result.isLeft()) {
      throw result.value
    }

    expect(inMemoryProducerFarmsRepository.items[0]).toMatchObject({
      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',
      farmArea: expect.objectContaining({ value: 10 }),
      vegetationArea: '4',
      agriculturalArea: '4',
    })

  })

})