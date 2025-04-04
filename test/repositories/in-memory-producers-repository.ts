import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'

import { InMemoryFarmsRepository } from 'test/repositories/in-memory-farms-repository'
import { InMemoryProducerFarmsRepository } from 'test/repositories/in-memory-producer-farms-repository'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

export class InMemoryProducersRepository implements ProducersRepository {
  public items: Producer[] = []

  constructor(
    private farmsRepository: InMemoryFarmsRepository,
    private producerFarmsRepository: InMemoryProducerFarmsRepository,
  ) {}

  async save(producer: Producer) {
    const itemIndex = this.items.findIndex((item) => item.id === producer.id)

    this.items[itemIndex] = producer

    await this.producerFarmsRepository.createMany(
      producer.farms.getNewItems(),
    )

    await this.producerFarmsRepository.deleteMany(
      producer.farms.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(producer.id)
  }

  async create(producer: Producer) {
    this.items.push(producer)

    DomainEvents.dispatchEventsForAggregate(producer.id)
  }

  async delete(producer: Producer) {
    const itemIndex = this.items.findIndex((item) => item.id === producer.id)

    this.items.splice(itemIndex, 1)

    this.producerFarmsRepository.deleteManyByProducerId(
      producer.id.toString(),
    )
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = this.items.find((item) => item.id.toString() === id)

    if (!producer) {
      return null
    }

    return producer 
  }

  async findByEmail(email: string) {
    const producer = this.items.find((item) => item.email === email)

    if (!producer) {
      return null
    }

    return producer
  }

  async findByDocument(document: Document) {
    const producer = this.items.find((item) => item.document === document)

    if (!producer) {
      return null
    }

    return producer
  }

  async findDetailsById(id: string): Promise<ProducerDetails | null> {
    const producer = this.items.find((item) => item.id.toString() === id)
  
      if (!producer) {
        return null
      }
  
      const producerFarms = this.producerFarmsRepository.items.filter(
        (producerFarm) => {
          return producerFarm.producerId.equals(producer.id)
        },
      )
  
      const farms = producerFarms.map((producerFarm) => {
        const farm = this.farmsRepository.items.find((farm) => 
          farm.id.equals(producerFarm.farmId)
        )
  
        if (!farm) {
          throw new Error(
            `Farm with ID "${producerFarm.farmId.toString()}" does not exist.`,
          )
        }
  
        return farm
      })
  
      return ProducerDetails.create({
        producerId: producer.id,
        
        name: producer.name,
        email: producer.email,
        document: producer.document,
        
        farms,
  
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt,
      })
  }

  async findDetailsByEmail(email: string): Promise<ProducerDetails | null> {
    const producer = this.items.find((item) => item.email.toString() === email)
  
      if (!producer) {
        return null
      }
  
      const producerFarms = this.producerFarmsRepository.items.filter(
        (producerFarm) => {
          return producerFarm.producerId.equals(producer.id)
        },
      )
  
      const farms = producerFarms.map((producerFarm) => {
        const farm = this.farmsRepository.items.find((farm) => 
          farm.id.equals(producerFarm.farmId)
        )
  
        if (!farm) {
          throw new Error(
            `Farm with ID "${producerFarm.farmId.toString()}" does not exist.`,
          )
        }
  
        return farm
      })
  
      return ProducerDetails.create({
        producerId: producer.id,
        
        name: producer.name,
        email: producer.email,
        document: producer.document,
        
        farms,
  
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt,
      })
  }

  async findDetailsByDocument(document: Document): Promise<ProducerDetails | null> {
    const producer = this.items.find((item) => item.document === document)
  
      if (!producer) {
        return null
      }
  
      const producerFarms = this.producerFarmsRepository.items.filter(
        (producerFarm) => {
          return producerFarm.producerId.equals(producer.id)
        },
      )
  
      const farms = producerFarms.map((producerFarm) => {
        const farm = this.farmsRepository.items.find((farm) => 
          farm.id.equals(producerFarm.farmId)
        )
  
        if (!farm) {
          throw new Error(
            `Farm with ID "${producerFarm.farmId.toString()}" does not exist.`,
          )
        }
  
        return farm
      })
  
      return ProducerDetails.create({
        producerId: producer.id,
        
        name: producer.name,
        email: producer.email,
        document: producer.document,
        
        farms,
  
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt,
      })
  }

  async findManyRecent({ page }: PaginationParams): Promise<Producer[]> {
    const farms = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  
    if (!farms || farms.length === 0) {
      return []
    }
  
    return farms
  }
  
  async findManyByName(name: string, { page }: PaginationParams): Promise<Producer[] | null> {
    const producers = this.items
      .filter((item) => item.name === name)
      .slice((page - 1) * 20, page * 20)
  
    if (!producers || producers.length === 0) {
      return null
    }
  
    return producers
  }

}