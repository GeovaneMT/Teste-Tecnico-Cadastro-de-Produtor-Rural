import { PaginationParams } from '@/core/repositories/pagination-params'

import { Producer } from '@/domain/erm/enterprise/entities/producer'
import { ProducerDetails } from '@/domain/erm/enterprise/entities/value-objects/producer-details'

import { CPF } from '@/domain/erm/enterprise/entities/value-objects/cpf'
import { CNPJ } from '@/domain/erm/enterprise/entities/value-objects/cnpj'

export abstract class ProducersRepository {
  abstract save(producer: Producer): Promise<void>
  abstract create(producer: Producer): Promise<void>
  abstract delete(producer: Producer): Promise<void>

  abstract findById(id: string): Promise<Producer | null>
  abstract findByEmail(email: string): Promise<Producer | null>
  abstract findByFarmId(farmId: string): Promise<Producer | null>
  abstract findByDocument(document: CPF | CNPJ): Promise<Producer | null>

  abstract findDetailsById(id: string): Promise<ProducerDetails | null>
  abstract findDetailsByEmail(email: string): Promise<ProducerDetails | null>
  abstract findDetailsByFarmId(farmId: string): Promise<ProducerDetails | null>
  abstract findDetailsByDocument(document: CPF | CNPJ): Promise<ProducerDetails | null>
  
  abstract findManyByName(name: string, params: PaginationParams): Promise<Producer[] | null>
  abstract findManyByFarmName(farmName: string, params: PaginationParams): Promise<Producer[] | null>  
  abstract findManyRecent(params: PaginationParams): Promise<Producer[] | null>
}