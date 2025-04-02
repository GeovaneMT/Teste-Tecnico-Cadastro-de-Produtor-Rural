import { CropType } from '@/domain/erm/utils/crop-type-enum'
import { RegisterFarmUseCase } from '@/domain/erm/application/use-cases/farm/register-farm'

import { makeCrop } from 'test/factories/make-crop'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository

let sut: RegisterFarmUseCase

describe('Register Farm', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducersRepository = new InMemoryProducersRepository()
    inMemoryFarmsRepository = new InMemoryFarmsRepository(InMemoryCropsRepository, InMemoryFarmCropsRepository, InMemoryProducersRepository)

    sut = new RegisterFarmUseCase(inMemoryFarmsRepository)
  })

  it('should be able to register a new farm', async () => {

    const cropOne = makeCrop({type: CropType.Cotton, description: 'crop_1_description'})
    const cropTwo = makeCrop({type: CropType.Coffee, description: 'crop_2_description'})

    const cropsIds = [cropOne.id.toString(), cropTwo.id.toString()]

    const result = await sut.execute({
      ownerId: 'any_owner_id',
      name: 'farm_name',
      city: 'farm_city',
      state: 'farm_state',

      farmArea: 'farm_area',
      vegetationArea: 'vegetation_area',
      agriculturalArea: 'agricultural_area',

      cropsIds,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      farm: inMemoryFarmsRepository.items[0],
    })
  })
})