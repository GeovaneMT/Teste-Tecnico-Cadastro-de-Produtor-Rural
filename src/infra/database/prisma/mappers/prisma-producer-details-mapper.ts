import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaFarmMapper } from '@/infra/database/prisma/mappers/prisma-farm-mapper'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

import {
  Producer as PrismaProducer,
  Farm as PrismaFarm,
} from '@prisma/client'

type PrismaProducerDetails = PrismaProducer & {
  farms: PrismaFarm[]
}

export class PrismaProducerDetailsMapper {
  static toDomain(raw: PrismaProducerDetails): ProducerDetails {
    let document: CPF | CNPJ
  
    try {
      document = CPF.create(raw.document)
    } catch {
      document = CNPJ.create(raw.document)
    }
    return ProducerDetails.create({
      producerId: new UniqueEntityID(raw.id),
      name: raw.name,
      email: raw.email,
      document,
      farms: raw.farms.map(PrismaFarmMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}