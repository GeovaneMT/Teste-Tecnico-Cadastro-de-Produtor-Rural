import { DomainEvents } from '@/core/events/domain-events'

import { Admin } from '@/domain/erm/enterprise/entities/admin'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async save(admin: Admin) {
    const itemIndex = this.items.findIndex((item) => item.id === admin.id)

    this.items[itemIndex] = admin

    DomainEvents.dispatchEventsForAggregate(admin.id)
  }

  async delete(admin: Admin) {
    const itemIndex = this.items.findIndex((item) => item.id === admin.id)

    this.items.splice(itemIndex, 1)
  }

  async create(admin: Admin) {
    this.items.push(admin)

    DomainEvents.dispatchEventsForAggregate(admin.id)
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.id.toString() === id)

    if (!admin) {
      return null
    }

    return admin 
  }

  async findByEmail(email: string) {
    const admin = this.items.find((item) => item.email === email)

    if (!admin) {
      return null
    }

    return admin
  }

  
}