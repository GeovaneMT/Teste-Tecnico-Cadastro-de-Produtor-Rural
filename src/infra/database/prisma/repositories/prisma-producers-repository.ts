import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { CacheRepository } from '@/infra/cache/cache-repository'

import { PrismaProducerMapper } from '@/infra/database/prisma/mappers/prisma-producer-mapper'
import { PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'
import { PrismaProducerDetailsMapper } from '@/infra/database/prisma/mappers/prisma-producer-details-mapper'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

import { Producer } from '@/domain/erm/enterprise/entities/producer'

import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ProducerFarmsRepository } from '@/domain/erm/application/repositories/producer-farms-repository'

@Injectable()
export class PrismaProducersRepository implements ProducersRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
    private producerFarmsRepository: ProducerFarmsRepository,
  ) {}

  async save(producer: Producer): Promise<void> {
    const data = PrismaProducerMapper.toPrisma(producer)

    await Promise.all([
      this.prisma.producer.update({
        where: {
          id: producer.id.toString(),
        },
        data,
      }),

      this.producerFarmsRepository.createMany(
        producer.farms.getNewItems(),
      ),

      this.producerFarmsRepository.deleteMany(
        producer.farms.getRemovedItems(),
      ),
      
      this.cache.delete(`producer:${data.id}:details`),
      this.cache.delete(`producer:${data.email}:details`),
      this.cache.delete(`producer:${data.document}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(producer.id)
  }

  async create(producer: Producer): Promise<void> {
    const data = PrismaProducerMapper.toPrisma(producer)
  
    await this.prisma.producer.create({
      data,
    })

    await this.producerFarmsRepository.createMany(
      producer.farms.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(producer.id)

  }

  async delete(producer: Producer): Promise<void> {
    const data = PrismaProducerMapper.toPrisma(producer)

    await this.prisma.producer.delete({
      where: {
        id: data.id,
      },
    })

    this.cache.delete(`producer:${data.id}:details`),
    this.cache.delete(`producer:${data.email}:details`),
    this.cache.delete(`producer:${data.document}:details`)
  }
  
  async findById(id: string): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        id,
      },
    })

    if (!producer) {
      return null
    }

    return PrismaProducerMapper.toDomain(producer)
  }

  async findByEmail(email: string): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        email,
      },
    })

    if (!producer) {
      return null
    }

    return PrismaProducerMapper.toDomain(producer)
  }

  async findByDocument(document: Document): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        document: document.getValue(),
      },
    })

    if (!producer) {
      return null
    }

    return PrismaProducerMapper.toDomain(producer)
  }

  async findDetailsById(id: string): Promise<ProducerDetails | null> {
    const cacheHit = await this.cache.get(`producer:${id}:details`)

    if (cacheHit) {
      const producer = JSON.parse(cacheHit)
      return PrismaProducerDetailsMapper.toDomain(producer)
    }

    const producer = await this.prisma.producer.findUnique({
      where: {
        id,
      },
      include: {
        farms: {
          include: {
            owner: true,
            crops: true,
          },
        },
      },
    })

    if (!producer) {
      return null
    }
    
    const producerDetails = PrismaProducerDetailsMapper.toDomain({
      ...producer,
      farmsDetails: producer.farms,
    })

    await this.cache.set(
      `producer:${id}:details`,
      JSON.stringify(producerDetails),
    )

    return producerDetails
  }

  async findDetailsByEmail(email: string): Promise<ProducerDetails | null> {
    const cacheHit = await this.cache.get(`producer:${email}:details`)

    if (cacheHit) {
      const producer = JSON.parse(cacheHit)
      return PrismaProducerDetailsMapper.toDomain(producer)
    }

    const producer = await this.prisma.producer.findUnique({
      where: {
        email,
      },
      include: {
        farms: {
          include: {
            owner: true,
            crops: true,
          },
        },
      },
    })

    if (!producer) {
      return null
    }

    const farmsDetails = producer.farms.map((farm) => 
      PrismaFarmDetailsMapper.toDomain({
        ...farm,
        owner: farm.owner,
      })
    )

    const producerDetails = PrismaProducerDetailsMapper.toDomain({
      ...producer,
      farmsDetails: producer.farms,
    })

    await this.cache.set(
      `producer:${email}:details`,
      JSON.stringify(producerDetails),
    )

    return producerDetails
  }

  async findDetailsByDocument(document: Document): Promise<ProducerDetails | null> {
    const cacheHit = await this.cache.get(`producer:${document}:details`)

    if (cacheHit) {
      const producer = JSON.parse(cacheHit)
      return PrismaProducerDetailsMapper.toDomain(producer)
    }

    const producer = await this.prisma.producer.findUnique({
      where: {
        document: document.getValue(),
      },
      include: {
        farms: {
          include: {
            owner: true,
            crops: true,
          },
        },
      },
    })

    if (!producer) {
      return null
    }

    const producerDetails = PrismaProducerDetailsMapper.toDomain({
      ...producer,
      farmsDetails: producer.farms,
    })

    await this.cache.set(
      `producer:${document}:details`,
      JSON.stringify(producerDetails),
    )

    return producerDetails
  }

  async findManyRecent({ page }: PaginationParams): Promise<Producer[]> {
    const producers = await this.prisma.producer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producers.map(PrismaProducerMapper.toDomain)
  }

  async findManyByName(name: string, { page }: PaginationParams): Promise<Producer[]> {
    const producers = await this.prisma.producer.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return producers.map(PrismaProducerMapper.toDomain)
  }
  
}