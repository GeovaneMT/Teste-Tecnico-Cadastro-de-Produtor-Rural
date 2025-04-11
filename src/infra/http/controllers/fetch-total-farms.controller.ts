import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Roles } from '@/infra/auth/roles.decorator'
import { FetchTotalFarmsUseCase } from '@/domain/erm/application/use-cases/fetch-total-farms'

@Controller('/totalFarms')
export class FetchTotalFarmsController {
  constructor(private fetchTotalFarms: FetchTotalFarmsUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle() {
    const result = await this.fetchTotalFarms.execute()

    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const totalFarms = result.value

    return { totalFarms: totalFarms.totalFarms }
  }
}