import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { EditProducerUseCase } from '@/domain/erm/application/use-cases/edit-producer'

import { makeProducer } from 'test/factories/make-producer'

import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: EditProducerUseCase

describe('Edit Producer', () => {
  beforeEach(() => {
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryFarmCropsRepository, 
    )

    inMemoryProducersRepository = new InMemoryProducersRepository(
      inMemoryProducerFarmsRepository,
    )

    sut = new EditProducerUseCase(
      inMemoryProducersRepository,
    )
  })

  it('Should be able to edit a producer', async () => {
    const document = Document.generateValidDocument()
    const newProducer = makeProducer(
      {},
      new UniqueEntityID('producer-1'),
    )

    await inMemoryProducersRepository.create(newProducer)

    await sut.execute({
      producerId: newProducer.id.toValue(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      document: document.getValue(),
    })

    expect(inMemoryProducersRepository.items[0]).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@example.com',
      document,
    })
  })

})