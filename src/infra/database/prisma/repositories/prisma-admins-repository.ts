import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'

import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAdminMapper } from '@/infra/database/prisma/mappers/prisma-admin-mapper'

import { Admin } from '@/domain/erm/enterprise/entities/admin'
import { AdminsRepository } from '@/domain/erm/application/repositories/admins-repository'

@Injectable()
export class PrismaAdminsRepository implements AdminsRepository {
  
  constructor(
    private prisma: PrismaService
  ) {}

  async save(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)

    await Promise.all([
      this.prisma.user.update({
        where: {
          id: admin.id.toString(),
        },
        data,
      }),
    ])

    DomainEvents.dispatchEventsForAggregate(admin.id)
  }

  async create(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)
  
    await this.prisma.user.create({
      data,
    })

    DomainEvents.dispatchEventsForAggregate(admin.id)
  }

  async delete(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
  
  async findById(id: string): Promise<Admin | null> {
    const admin = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!admin) {
      return null
    }

    return PrismaAdminMapper.toDomain(admin)
  }

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

}