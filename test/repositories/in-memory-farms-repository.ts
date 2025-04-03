import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { Farm } from '@/domain/erm/enterprise/entities/farm'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'
import { FarmsRepository } from '@/domain/erm/application/repositories/farms-repository'

import { InMemoryCropsRepository } from 'test/repositories/in-memory-crops-repository'
import { InMemoryProducersRepository } from 'test/repositories/in-memory-producers-repository'
import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'

export class InMemoryFarmsRepository implements FarmsRepository {
  public items: Farm[] = []

  constructor(
    private cropsRepository: InMemoryCropsRepository,
    private farmCropsRepository: InMemoryFarmCropsRepository,
    private producersRepository: InMemoryProducersRepository,
  ) {}

  async save(farm: Farm) {
    const itemIndex = this.items.findIndex((item) => item.id === farm.id)

    this.items[itemIndex] = farm

    DomainEvents.dispatchEventsForAggregate(farm.id)
  }

  async create(farm: Farm) {
    this.items.push(farm)

    DomainEvents.dispatchEventsForAggregate(farm.id)
  }

  async delete(farm: Farm) {
    const itemIndex = this.items.findIndex((item) => item.id === farm.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Farm | null> {
    const farm = this.items.find((item) => item.id.toString() === id)

    if (!farm) {
      return null
    }

    return farm 
  }

  async findDetailsById(id: string) {
    const farm = this.items.find((item) => item.id.toString() === id)

    if (!farm) {
      return null
    }

    const owner = await this.producersRepository.items.find((producer) => {
      return producer.id.equals(farm.ownerId)
    })

    if (!owner) {
      throw new Error(
        `Owner with ID "${farm.ownerId.toString()}" does not exist.`,
      )
    }

    const farmCrops = await this.farmCropsRepository.items.filter(
      (farmCrop) => {
        return farmCrop.farmId.equals(farm.id)
      },
    )

    const crops = farmCrops.map((farmCrop) => {
      const crop = this.cropsRepository.items.find((crop) => {
        return crop.id.equals(farmCrop.cropId)
      })

      if (!crop) {
        throw new Error(
          `Crop with ID "${farmCrop.cropId.toString()}" does not exist.`,
        )
      }

      return crop
    })

    return FarmDetails.create({
      farmId: farm.id,
      ownerId: farm.ownerId,
      owner: owner.name,
      
      name: farm.name,
      city: farm.city,
      state: farm.state,
      
      farmArea: farm.farmArea,
      vegetationArea: farm.vegetationArea,
      agriculturalArea: farm.agriculturalArea,
      
      crops,

      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    })
  }

  async findManyRecent({ page }: PaginationParams): Promise<Farm[]> {
    const farms = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return []
    }

    return farms
  }

  async findManyByOwnerId(ownerId: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.ownerId.toString() === ownerId)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByName(name: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.name === name)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByCity(city: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByState(state: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.state === state)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByFarmArea(farmArea: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.farmArea === farmArea)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByVegetationArea(vegetationArea: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.vegetationArea === vegetationArea)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

  async findManyByAgriculturalArea(agriculturalArea: string, { page }: PaginationParams): Promise<Farm[] | null> {
    const farms = this.items
      .filter((item) => item.agriculturalArea === agriculturalArea)
      .slice((page - 1) * 20, page * 20)

    if (!farms || farms.length === 0) {
      return null
    }

    return farms
  }

}