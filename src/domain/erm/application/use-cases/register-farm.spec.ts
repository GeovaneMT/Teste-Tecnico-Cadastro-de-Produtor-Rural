import { CropType } from '@/domain/erm/utils/crop-type-enum'
import { RegisterFarmUseCase } from '@/domain/erm/application/use-cases/register-farm'

import { makeCrop } from 'test/factories/make-crops'
import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'
import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'

let inMemoryCropsRepository: InMemoryCropsRepository
let inMemoryFarmsRepository: InMemoryFarmsRepository
let inMemoryFarmCropsRepository: InMemoryFarmCropsRepository
let inMemoryProducersRepository: InMemoryProducersRepository
let inMemoryProducerFarmsRepository: InMemoryProducerFarmsRepository

let sut: RegisterFarmUseCase

describe('Register Farm', () => {
  beforeEach(() => {
    inMemoryCropsRepository = new InMemoryCropsRepository()
    inMemoryFarmCropsRepository = new InMemoryFarmCropsRepository()
    inMemoryProducerFarmsRepository = new InMemoryProducerFarmsRepository()
    inMemoryProducersRepository = new InMemoryProducersRepository(inMemoryFarmsRepository, inMemoryProducerFarmsRepository)
    inMemoryFarmsRepository = new InMemoryFarmsRepository(inMemoryCropsRepository, inMemoryFarmCropsRepository, inMemoryProducersRepository)

    sut = new RegisterFarmUseCase(inMemoryFarmsRepository)
  })

  it('should be able to register a new farm', async () => {

    const cropOne = makeCrop({type: 'COTTON', description: 'crop_1_description'})
    const cropTwo = makeCrop({type: 'COFFEE', description: 'crop_2_description'})

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