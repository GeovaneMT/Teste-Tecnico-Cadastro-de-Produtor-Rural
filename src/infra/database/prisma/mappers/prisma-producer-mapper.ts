import { Producer as PrismaProducer, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'
import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'

export class PrismaProducerMapper {

  static toDomain(raw: PrismaProducer): Producer {
    let document: CPF | CNPJ

    try {
      document = CPF.create(raw.document)
    } catch {
      document = CNPJ.create(raw.document)
    }

    return Producer.create(
      {
        name: raw.name,
        email: raw.email,
        document,
      
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