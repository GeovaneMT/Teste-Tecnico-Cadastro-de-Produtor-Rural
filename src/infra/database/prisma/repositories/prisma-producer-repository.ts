import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaProducerMapper } from '@/infra/database/prisma/mappers/prisma-producer-mapper'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'
import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'
import { PrismaProducerDetailsMapper } from '@/infra/database/prisma/mappers/prisma-producer-details-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'

@Injectable()
export class PrismaProducersRepository implements ProducersRepository {
  constructor(
    private prisma: PrismaService
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
    ])
  }

  async create(producer: Producer): Promise<void> {
    const data = PrismaProducerMapper.toPrisma(producer)
  
    await this.prisma.producer.create({
      data,
    })

  }

  async delete(producer: Producer): Promise<void> {
    const data = PrismaProducerMapper.toPrisma(producer)

    await this.prisma.producer.delete({
      where: {
        id: data.id,
      },
    })
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

  async findByFarmId(farmId: string): Promise<Producer | null> {
    const producer = await this.prisma.producer.findFirst({
      where: { farms: { some: { id: farmId } } },
    })
  
    return producer ? PrismaProducerMapper.toDomain(producer) : null;
  }  

  async findByDocument(document: CPF | CNPJ): Promise<Producer | null> {
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
    const producer = await this.prisma.producer.findUnique({
      where: {
        id,
      },
      include: {
        farms: true,
      },
    })

    if (!producer) {
      return null
    }

    const producerDetails = PrismaProducerDetailsMapper.toDomain(producer)

    return producerDetails
  }

  async findDetailsByEmail(email: string): Promise<ProducerDetails | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        email,
      },
      include: {
        farms: true,
      },
    })

    if (!producer) {
      return null
    }

    const producerDetails = PrismaProducerDetailsMapper.toDomain(producer)

    return producerDetails
  }

  async findDetailsByFarmId(farmId: string): Promise<ProducerDetails | null> {
    const producer = await this.prisma.producer.findFirst({
      where: {
        farms: { 
          some: { 
            id: farmId 
          } 
        }
      },
      include: {
        farms: true,
      },
    })

    if (!producer) {
      return null
    }

    const producerDetails = PrismaProducerDetailsMapper.toDomain(producer)

    return producerDetails
  }
  
  async findDetailsByDocument(document: CPF | CNPJ): Promise<ProducerDetails | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        document: document.getValue(),
      },
      include: {
        farms: true,
      },
    })

    if (!producer) {
      return null
    }

    const producerDetails = PrismaProducerDetailsMapper.toDomain(producer)

    return producerDetails
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

  async findManyByFarmName(farmName: string, { page }: PaginationParams): Promise<Producer[]> {
    const producers = await this.prisma.producer.findMany({
      where: {
        farms: { 
          some: { 
            name: {
              contains: farmName,
              mode: 'insensitive',
            } 
          } 
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
  
}