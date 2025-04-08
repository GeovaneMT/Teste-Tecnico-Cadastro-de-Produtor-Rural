import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteCropUseCase } from '@/domain/erm/application/use-cases/delete-crop'

import { makeCrop } from 'test/factories/make-crop'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let sut: DeleteCropUseCase

describe('Delete Crop', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()

    sut = new DeleteCropUseCase(inMemoryCropsRepository)
  })

  it('should be able to delete a crop', async () => {
    const newCrop = makeCrop(
      {},
      new UniqueEntityID('crop-1'),
    )

    await inMemoryCropsRepository.create(newCrop)

    await sut.execute({
      cropId: 'crop-1',
    })

    expect(inMemoryCropsRepository.items).toHaveLength(0)

    expect(inMemoryCropsRepository.items).toHaveLength(0)
  })
})