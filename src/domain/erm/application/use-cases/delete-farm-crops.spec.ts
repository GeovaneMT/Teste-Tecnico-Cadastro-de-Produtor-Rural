import { InMemoryCropCropsRepository } from 'test/repositories/in-memory-producer-crops-repository'
import { DeleteCropCropUseCase } from '@/domain/erm/application/use-cases/delete-producer-crops'
import { makeCropCrop } from 'test/factories/make-producer-crops'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-producers-repository'

let inMemoryCropCropsRepository: InMemoryCropCropsRepository
let inMemoryCropsRepository: InMemoryCropsRepository
let sut: DeleteCropCropUseCase

describe('Delete Crop Crop', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryCropCropsRepository = new InMemoryCropCropsRepository(
      inMemoryCropsRepository,
    )

    sut = new DeleteCropCropUseCase(inMemoryCropCropsRepository)
  })

  it('should be able to delete a producer crop', async () => {
    const producerCrop = makeCropCrop()

    await inMemoryCropCropsRepository.create(producerCrop)

    await sut.execute({
      producerCropId: producerCrop.id.toString(),
      producerId: producerCrop.producerId.toString(),
    })

    expect(inMemoryCropCropsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user producer crop', async () => {
    const producerCrop = makeCropCrop({
      producerId: new UniqueEntityID('owner-1'),
    })

    await inMemoryCropCropsRepository.create(producerCrop)

    const result = await sut.execute({
      producerCropId: producerCrop.id.toString(),
      producerId: 'owner-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})