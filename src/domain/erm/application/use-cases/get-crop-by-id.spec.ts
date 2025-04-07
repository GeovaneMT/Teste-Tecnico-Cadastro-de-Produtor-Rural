import { GetCropByIdUseCase } from '@/domain/erm/application/use-cases/get-crop-by-id'

import { makeCrop } from 'test/factories/make-crops'
import { makeFarm } from 'test/factories/make-farms'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'

let inMemoryCropsRepository: InMemoryCropsRepository

let sut: GetCropByIdUseCase

describe('Get Crop By Id', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    sut = new GetCropByIdUseCase(inMemoryCropsRepository)
  })

  it('should be able to get a crop by id', async () => {

    const newFarm = makeFarm()
    
    const crop = makeCrop({
      landId: newFarm.id,
      type: 'SOYBEANS',
      description: 'Some description',
    })

    inMemoryCropsRepository.items.push(crop)

    const result = await sut.execute({
      id: crop.id.toString(),
    })

    if (result.isLeft()) {
      throw result.value
    }
    
    expect(result.value.crop.id).toBe(crop.id)
    expect(result.value.crop.landId).toBe(newFarm.id)

    expect(result.value.crop.type).toBe(crop.type)
    expect(result.value.crop.description).toBe(crop.description)
    
  })
})