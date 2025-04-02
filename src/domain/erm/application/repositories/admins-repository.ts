import { Admin } from '@/domain/erm/enterprise/entities/admin'

export abstract class AdminsRepository {
  abstract save(admin: Admin): Promise<void>
  abstract create(admin: Admin): Promise<void>
  abstract delete(admin: Admin): Promise<void>

  abstract findById(id: string): Promise<Admin | null>
  abstract findByEmail(email: string): Promise<Admin | null>
}