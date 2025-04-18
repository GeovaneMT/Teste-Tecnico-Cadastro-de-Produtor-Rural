import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional' 
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface NotificationProps {
  recipientId: UniqueEntityID
  userId?: UniqueEntityID | null
  title: string
  content: string
  readAt?: Date | null
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get userId() {
    return this.props.userId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}