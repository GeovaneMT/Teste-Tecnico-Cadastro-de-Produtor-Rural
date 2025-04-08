import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { DeleteProducerFarmUseCase } from '@/domain/erm/application/use-cases/delete-producer-farms'
import { makeProducerFarm } from 'test/factories/make-producer-farm'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'

let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let sut: DeleteProducerFarmUseCase

describe('Delete Producer Farm', () => {
  beforeEach(() => {
    inMemoryProducersRepository = new InMemoryProducersRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository(
      inMemoryProducersRepository,
    )

    sut = new DeleteProducerFarmUseCase(inMemoryProducerFarmsRepository)
  })

  it('should be able to delete a producer farm', async () => {
    const producerFarm = makeProducerFarm()

    await inMemoryProducerFarmsRepository.create(producerFarm)

    await sut.execute({
      producerFarmId: producerFarm.id.toString(),
      producerId: producerFarm.producerId.toString(),
    })

    expect(inMemoryProducerFarmsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user producer farm', async () => {
    const producerFarm = makeProducerFarm({
      producerId: new UniqueEntityID('owner-1'),
    })

    await inMemoryProducerFarmsRepository.create(producerFarm)

    const result = await sut.execute({
      producerFarmId: producerFarm.id.toString(),
      producerId: 'owner-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})