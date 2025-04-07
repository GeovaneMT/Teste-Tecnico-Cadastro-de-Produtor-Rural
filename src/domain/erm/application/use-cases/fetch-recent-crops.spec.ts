import { FetchRecentCropsUseCase } from '@/domain/erm/application/use-cases/fetch-recent-crops'

import { makeCrop } from 'test/factories/make-crops'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let sut: FetchRecentCropsUseCase

describe('Fetch Recent Crops', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    
    sut = new FetchRecentCropsUseCase(inMemoryCropsRepository)
  })

  it('should be able to fetch recent crops', async () => {
    await inMemoryCropsRepository.create(
      makeCrop({ createdAt: new Date(2022, 0, 20) }),
    )
    await inMemoryCropsRepository.create(
      makeCrop({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryCropsRepository.create(
      makeCrop({ createdAt: new Date(2022, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.crops).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recent crops', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCropsRepository.create(makeCrop())
    }

    const result = await sut.execute({
      page: 2,
    })

    if (result.isLeft()) {
      throw new Error(result.value.message)
    }

    expect(result.value.crops).toHaveLength(2)
  })
})