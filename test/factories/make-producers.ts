import { faker } from '@faker-js/faker'

import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaProducerMapper } from '@/infra/database/prisma/mappers/prisma-producer-mapper'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

import { Producer,ProducerProps } from '@/domain/erm/enterprise/entities/producer'

export function makeProducer(
  override: Partial<ProducerProps> = {},
  id?: UniqueEntityID,
) {

  const document = Document.generateValidDocument()

  const producer = Producer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      document,
      ...override,
    },
    id,
  )

  return producer
}

@Injectable()
export class ProducerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProducer(data: Partial<ProducerProps> = {}): Promise<Producer> {
    const producer = makeProducer(data)

    await this.prisma.producer.create({
      data: PrismaProducerMapper.toPrisma(producer),
    })

    return producer
  }
}