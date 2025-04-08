import { Producer as PrismaProducer, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'

export class PrismaProducerMapper {

  static toDomain(raw: PrismaProducer): Producer {

    return Producer.create(
      {
        name: raw.name,
        email: raw.email,
        document: Document.create(raw.document),
      
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(producer: Producer): Prisma.ProducerUncheckedCreateInput {
    return {
      id: producer.id.toString(),
      name: producer.name,
      email: producer.email,
      document: producer.document.getValue(),

      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    }
  }
  
}