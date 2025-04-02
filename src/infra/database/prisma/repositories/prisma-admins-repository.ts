import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAdminMapper } from '@/infra/database/prisma/mappers/prisma-admin-mapper'

import { Admin } from '@/domain/erm/enterprise/entities/admin'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

@Injectable()
export class PrismaAdminsRepository implements AdminsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!admin) {
      return null
    }

    return PrismaAdminMapper.toDomain(admin)
  }

  async create(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.create({
      data,
    })
  }
}