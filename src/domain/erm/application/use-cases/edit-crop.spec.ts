import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { EditCropUseCase } from '@/domain/erm/application/use-cases/edit-crop'

import { makeCrop } from 'test/factories/make-crop'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'

let inMemoryCropsRepository: InMemoryCropsRepository

let sut: EditCropUseCase

describe('Edit Crop', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()

    sut = new EditCropUseCase(
      inMemoryCropsRepository,
    )
  })

  it('should be able to edit a crop', async () => {
    const newCrop = makeCrop(
      {},
      new UniqueEntityID('crop-1'),
    )

    await inMemoryCropsRepository.create(newCrop)

    const result = await sut.execute({
      cropId: newCrop.id.toValue(),
      landId: newCrop.landId.toValue(),
      
      type: 'COFFEE',
      description: 'TEST DESCRIPTION',
    })

    if (result.isLeft()) {
      throw result.value
    }

    expect(inMemoryCropsRepository.items[0]).toMatchObject({
      type: 'COFFEE',
      description: 'TEST DESCRIPTION',
    })
  })
})