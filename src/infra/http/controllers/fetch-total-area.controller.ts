import { UserRole } from '@prisma/client'
import { BadRequestException, NotFoundException, Controller, Get } from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Roles } from '@/infra/auth/roles.decorator'
import { FetchTotalAreaUseCase } from '@/domain/erm/application/use-cases/fetch-total-area'

@Controller('/totalArea')
export class FetchTotalAreaController {
  constructor(private fetchTotalArea: FetchTotalAreaUseCase) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async handle() {
    const result = await this.fetchTotalArea.execute()

    if (result.isLeft()) {
      const error =result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const totalAreas = result.value

    return { totalAreas: totalAreas.totalArea }
  }
}