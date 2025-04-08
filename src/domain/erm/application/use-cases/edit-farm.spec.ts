import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { EditFarmUseCase } from '@/domain/erm/application/use-cases/edit-farm'

import { makeFarm } from 'test/factories/make-farm'
import { makeFarmCrop } from 'test/factories/make-farm-crop'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: EditFarmUseCase

describe('Edit Farm', () => {
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

    sut = new EditFarmUseCase(
      inMemoryFarmsRepository,
      inMemoryFarmCropsRepository,
    )
  })

  it('should be able to edit a farm', async () => {
    const newFarm = makeFarm(
      {},
      new UniqueEntityID('farm-1'),
    )

    await inMemoryFarmsRepository.create(newFarm)

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('1'),
      }),
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      farmId: newFarm.id.toValue(),
      ownerId: newFarm.ownerId.toValue(),
      
      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',

      farmArea: '10',
      vegetationArea: '4',
      agriculturalArea: '4',

      cropsIds: ['1', '3'],
    })

    if (result.isLeft()) {
      throw result.value
    }

    expect(inMemoryFarmsRepository.items[0]).toMatchObject({
      name: 'farm_name',
      city: 'farm_city',
      state: 'SP',
      farmArea: expect.objectContaining({ value: 10 }),
      vegetationArea: '4',
      agriculturalArea: '4',
    })
    

    expect(
      inMemoryFarmsRepository.items[0].crops.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryFarmsRepository.items[0].crops.currentItems,
    ).toEqual([
      expect.objectContaining({ cropId: new UniqueEntityID('1') }),
      expect.objectContaining({ cropId: new UniqueEntityID('3') }),
    ])
  })

  it('should sync new and removed crop when editing a farm', async () => {
    const newFarm = makeFarm(
      {},
      new UniqueEntityID('farm-1'),
    )

    await inMemoryFarmsRepository.create(newFarm)

    inMemoryFarmCropsRepository.items.push(
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('1'),
      }),
      makeFarmCrop({
        farmId: newFarm.id,
        cropId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      farmId: newFarm.id.toValue(),
      ownerId: newFarm.ownerId.toValue(),

      name: 'John Doe',
      city: 'farm_city',
      state: 'SP',

      agriculturalArea: '4',
      farmArea: '10',
      vegetationArea: '4',

      cropsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryFarmCropsRepository.items).toHaveLength(2)
    expect(inMemoryFarmCropsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cropId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          cropId: new UniqueEntityID('3'),
        }),
      ]),
    )
  })
})