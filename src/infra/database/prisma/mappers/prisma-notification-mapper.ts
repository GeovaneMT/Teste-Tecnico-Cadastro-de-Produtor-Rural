import { Notification as PrismaNotification, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        userId: raw.userId ? new UniqueEntityID(raw.userId) : undefined,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      recipientId: notification.recipientId.toString(),
      userId: notification.userId?.toString(),
      id: notification.id.toString(),
      title: notification.title,
      content: notification.content,
      readAt: notification.readAt,

      createdAt: notification.createdAt,
    }
  }
}