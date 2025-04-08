import { Producer as PrismaProducer } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaFarmDetails, PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

type PrismaProducerDetails = PrismaProducer & {
  farmsDetails: PrismaFarmDetails[]
}

export class PrismaProducerDetailsMapper {

  static toDomain(raw: PrismaProducerDetails): ProducerDetails {
        
    return ProducerDetails.create({
      producerId: new UniqueEntityID(raw.id),

      name: raw.name,
      email: raw.email,
      document: Document.create(raw.document),

      farmsDetails: raw.farmsDetails.map(PrismaFarmDetailsMapper.toDomain),

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
  
}