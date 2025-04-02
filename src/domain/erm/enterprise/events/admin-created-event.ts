import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

import { Admin } from '@/domain/erm/enterprise/entities/admin'

export class AdminCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public admin: Admin

  constructor(admin: Admin) {
    this.admin = admin
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.admin.id
  }
}