import { Admin } from '@/domain/erm/enterprise/entities/admin'

export abstract class AdminsRepository {
  abstract findByEmail(email: string): Promise<Admin | null>
  abstract create(student: Admin): Promise<void>
}