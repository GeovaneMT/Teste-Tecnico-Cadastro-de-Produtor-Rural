import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'

import { makeProducer } from 'test/factories/make-producers'
import { makeProducerFarm } from 'test/factories/make-producer-farms'

import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: EditProducerUseCase

describe('Edit Producer', () => {
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

    sut = new EditProducerUseCase(
      inMemoryProducersRepository,
      inMemoryProducerFarmsRepository,
    )
  })

  it('should be able to edit a producer', async () => {
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    inMemoryProducerFarmsRepository.items.push(
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('1'),
      }),
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      producerId: newProducer.id.toValue(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-01',
      farmsIds: ['1', '3'],
    })

    expect(inMemoryProducersRepository.items[0]).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-01',
    })

    expect(
      inMemoryProducersRepository.items[0].farms.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryProducersRepository.items[0].farms.currentItems,
    ).toEqual([
      expect.objectContaining({ farmId: new UniqueEntityID('1') }),
      expect.objectContaining({ farmId: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able to edit a producer from another user', async () => {
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    const result = await sut.execute({
      producerId: newProducer.id.toValue(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-01',
      farmsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should sync new and removed farm when editing a producer', async () => {
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    inMemoryProducerFarmsRepository.items.push(
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('1'),
      }),
      makeProducerFarm({
        producerId: newProducer.id,
        farmId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      producerId: newProducer.id.toValue(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: '123.456.789-01',
      farmsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProducerFarmsRepository.items).toHaveLength(2)
    expect(inMemoryProducerFarmsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          farmId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          farmId: new UniqueEntityID('3'),
        }),
      ]),
    )
  })
})