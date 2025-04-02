import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AdminCreatedEvent } from '@/domain/erm/enterprise/events/admin-created-event'

export interface AdminProps {
  name: string
  email: string
  password: string

  createdAt: Date
  updatedAt?: Date | null
}

export class Admin extends AggregateRoot<AdminProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<AdminProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAdmin = !id

    if (isNewAdmin) {
      admin.addDomainEvent(new AdminCreatedEvent(admin))
    }

    return admin
  }
}