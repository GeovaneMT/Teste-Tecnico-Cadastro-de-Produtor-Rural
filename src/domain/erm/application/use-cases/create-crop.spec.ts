import { CreateCropUseCase } from '@/domain/erm/application/use-cases/create-crop'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'

let inMemoryCropsRepository: InMemoryCropsRepository

let sut: CreateCropUseCase

describe('Create Crop', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    sut = new CreateCropUseCase(inMemoryCropsRepository)
  })

  it('should be able to create a new crop', async () => {

    const result = await sut.execute({
      landId: '1',
      type: 'SOYBEANS',
      description: 'Crop description',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      crop: inMemoryCropsRepository.items[0],
    })
  })
})