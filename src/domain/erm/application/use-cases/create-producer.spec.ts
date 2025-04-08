import { CreateProducerUseCase } from '@/domain/erm/application/use-cases/create-producer'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: CreateProducerUseCase

describe('Create Producer', () => {
  beforeEach(() => {
     inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
     
     inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
       inMemoryFarmCropsRepository, 
     )
    
    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )
    sut = new CreateProducerUseCase(inMemoryProducersRepository)
  })

  it('Should be able to create a new producer with CPF', async () => {
    
    const result = await sut.execute({
      name: 'jhon doe',
      email: 'johndoe@example.com',
      document: Document.create('123.456.789-09'),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      producer: inMemoryProducersRepository.items[0],
    })
  })

  it('Should be able to create a new producer with CNPJ', async () => {
    
    const result = await sut.execute({
      name: 'jhon doe',
      email: 'johndoe@example.com',
      document: Document.create('12.345.678/0001-95'),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      producer: inMemoryProducersRepository.items[0],
    })
  })

})