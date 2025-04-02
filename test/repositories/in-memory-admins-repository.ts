import { DomainEvents } from '@/core/events/domain-events'

import { Admin } from '@/domain/erm/enterprise/entities/admin'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async findByEmail(email: string) {
    const admin = this.items.find((item) => item.email === email)

    if (!admin) {
      return null
    }

    return admin
  }

  async create(admin: Admin) {
    this.items.push(admin)

    DomainEvents.dispatchEventsForAggregate(admin.id)
  }
}