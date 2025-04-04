import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository


let sut: CreateProducerUseCase

describe('Create Producer', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    inMemoryFarmsRepository = new InMemoryFarmsRepository(inMemoryCropsRepository, inMemoryFarmCropsRepository, inMemoryProducersRepository)
    inMemoryProducersRepository = new InMemoryProducersRepository(inMemoryFarmsRepository, inMemoryProducerFarmsRepository)

    sut = new CreateProducerUseCase(inMemoryProducersRepository)
  })

  it('should be able to create a new producer with CPF', async () => {
    
    const result = await sut.execute({
      name: 'jhon doe',
      email: 'johndoe@example.com',
      document: Document.create('123.456.789-09'),
      farmsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      producer: inMemoryProducersRepository.items[0],
    })
  })

  it('should be able to create a new producer with CNPJ', async () => {
    
    const result = await sut.execute({
      name: 'jhon doe',
      email: 'johndoe@example.com',
      document: Document.create('12.345.678/0001-95'),
      farmsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      producer: inMemoryProducersRepository.items[0],
    })
  })

})