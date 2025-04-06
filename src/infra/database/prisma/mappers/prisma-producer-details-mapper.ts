import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PrismaFarmDetailsMapper } from '@/infra/database/prisma/mappers/prisma-farm-details-mapper'

import { Document } from '@/domain/erm/enterprise/entities/value-objects/document'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

import {
  Farm as PrismaFarm,
  Crop as PrismaCrop,
  Producer as PrismaProducer,
} from '@prisma/client'

type PrismaProducerDetails = PrismaProducer & {
  farms: (PrismaFarm & {
    owner: PrismaProducer
    crops: PrismaCrop[]
  })[]
}

export class PrismaProducerDetailsMapper {
  static toDomain(raw: PrismaProducerDetails): ProducerDetails {
    
    const document = Document.create(raw.document)
    
    return ProducerDetails.create({
      producerId: new UniqueEntityID(raw.id),
      name: raw.name,
      email: raw.email,
      document,
      farmsDetails: raw.farms.map(PrismaFarmDetailsMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}