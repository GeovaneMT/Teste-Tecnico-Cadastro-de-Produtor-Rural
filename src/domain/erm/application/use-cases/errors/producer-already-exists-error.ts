import { UseCaseError } from '@/core/errors/use-case-error'

export class ProducerAlreadyExistsError extends Error implements UseCaseError {
  constructor(field: string, identifier: string) {
    super(`Producer with ${field} "${identifier}" already exists.`)
  }
}