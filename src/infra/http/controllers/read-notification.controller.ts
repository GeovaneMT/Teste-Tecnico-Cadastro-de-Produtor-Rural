import { ProducersRepository } from '@/domain/erm/application/repositories/producers-repository'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/notifications/:notificationId/read/:producerId')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('notificationId') notificationId: string,
    @Param('producerId') producerId: string,
  ) {

    const result = await this.readNotification.execute({
      notificationId,
      recipientId: producerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}