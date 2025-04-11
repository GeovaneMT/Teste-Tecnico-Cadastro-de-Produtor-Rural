import { UserRole } from '@prisma/client'

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { Roles } from '@/infra/auth/roles.decorator'

import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import {
  BadRequestException,
  UnauthorizedException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/notifications/:notificationId/read/:producerId')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async handle(
    @Param('notificationId') notificationId: string,
    @Param('producerId') producerId: string,
  ) {

    const result = await this.readNotification.execute({
      notificationId,
      recipientId: producerId,
    })

    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}