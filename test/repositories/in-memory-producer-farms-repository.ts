import { CropType, States } from '@prisma/client'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { DomainEvents } from '@/core/events/domain-events'

import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'
import { CropByState, CropTypeWithQuantity } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

import { InMemoryFarmCropsRepository } from 'test/repositories/in-memory-farm-crops-repository'

export class InMemoryProducerFarmsRepository implements ProducerFarmsRepository {
  public items: ProducerFarm[] = []
  
  constructor(
    private farmCropsRepository: InMemoryFarmCropsRepository,
  ) {}

  async save(producerFarm: ProducerFarm): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === producerFarm.id)

    this.items[itemIndex] = producerFarm

    await this.farmCropsRepository.createMany(
      producerFarm.crops.getNewItems(),
    )

    await this.farmCropsRepository.deleteMany(
      producerFarm.crops.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(producerFarm.id)
  }
  
  async create(producerFarm: ProducerFarm): Promise<void> {
    this.items.push(producerFarm)

    await this.farmCropsRepository.createMany(
      producerFarm.crops.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(producerFarm.id)

  }

  async delete(producerFarm: ProducerFarm): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === producerFarm.id,
    )

    await this.farmCropsRepository.deleteManyByFarmId(
      producerFarm.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<ProducerFarm | null> {
    const producerFarm = this.items.find((item) => item.id.toString() === id)

    if (!producerFarm) {
      return null
    }

    return producerFarm
  }

  async createMany(farms: ProducerFarm[]): Promise<void> {
    this.items.push(...farms)
  }

  async deleteMany(farms: ProducerFarm[]): Promise<void> {
    const producerFarms = this.items.filter((item) => {
      return !farms.some((farm) => producerFarms.equals(item))
    })

    this.items = producerFarms
  }

  async deleteManyByProducerId(producerId: string): Promise<void> {
    const farmsToDelete = this.items.filter((item) => 
      item.producerId.toString() === producerId
    )

    for (const farmToDelete of farmsToDelete) { 
      await this.farmCropsRepository.deleteManyByFarmId(
        farmToDelete.id.toString(),
      )
    }

    this.items = this.items.filter((item) => 
      item.producerId.toString() !== producerId
    )
  }
  
  async findManyRecent({ page }: PaginationParams): Promise<ProducerFarm[]> {
    const producerFarms = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return []
    }

    return producerFarms
  }

  async findManyByProducerId (producerId: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
    .filter((item) => item.producerId.toString() === producerId)
    .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByName(name: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.name === name)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByCity(city: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.city === city)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByState(state: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.state === state)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByFarmArea(farmArea: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.farmArea.getValue().toString() === farmArea)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByVegetationArea(vegetationArea: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.vegetationArea === vegetationArea)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findManyByAgriculturalArea(agriculturalArea: string, { page }: PaginationParams): Promise<ProducerFarm[] | null> {
    const producerFarms = this.items
      .filter((item) => item.agriculturalArea === agriculturalArea)
      .slice((page - 1) * 20, page * 20)

    if (!producerFarms || producerFarms.length === 0) {
      return null
    }

    return producerFarms
  }

  async findDetailsById(id: string) {
    const producerFarm = this.items.find((item) => item.id.toString() === id)

    if (!producerFarm) {
      return null
    }

    const farmCrops = this.farmCropsRepository.items.filter(
      (farmCrop) => {
        return farmCrop.farmId.equals(producerFarm.id)
      },
    )

    const CreateFarmAreaData = {
      farmArea: Number(producerFarm.farmArea.getValue()),
      agriculturalArea: Number(producerFarm.agriculturalArea),
      vegetationArea: Number(producerFarm.vegetationArea),
    }

    return FarmDetails.create({
      farmId: producerFarm.id,
      ownerId: producerFarm.producerId,
      
      name: producerFarm.name,
      city: producerFarm.city,
      state: producerFarm.state,
      
      farmArea: FarmArea.create(CreateFarmAreaData),
      vegetationArea: producerFarm.vegetationArea,
      agriculturalArea: producerFarm.agriculturalArea,
      
      farmCrops,

      createdAt: producerFarm.createdAt,
      updatedAt: producerFarm.updatedAt,
    })
  }
  
  async findTotalArea(): Promise<number> {

    const totalArea = this.items.reduce((sum, farm) => {
      const area = farm.farmArea.getValue()
      return sum + (isNaN(area) ? 0 : area)
    }, 0)
  
    return totalArea
  }
  
  async findTotalFarmsQuantity(): Promise<number> {
    return this.items.length
  }

  async getCropIndicators(): Promise<CropByState[]> {
    const cropsByState: CropByState[] = []

    for (const state of Object.values(States)) {

      const producerFarms = this.items
      .filter((item) => item.state.toString() === state)
      .map((item) => ({ id: item.id }))
    
      const farmsIds = producerFarms.map((farm) => farm.id)

      const cropTypesWithQuantity: CropTypeWithQuantity[] = []

      for (const cropType of Object.values(CropType)) {

        const CropQuantity = this.farmCropsRepository.items
        .filter((item) => item.type.toString() === cropType)
        .filter((item) => farmsIds.includes(item.farmId))
        .length
      
        if (CropQuantity > 0) {
          cropTypesWithQuantity.push({ cropType, total: CropQuantity })
        }
      }

      if (cropTypesWithQuantity.length > 0) {
          cropsByState.push(CropByState.create({state, cropTypesWithQuantity}))
      }
    }

    return cropsByState
  }

}