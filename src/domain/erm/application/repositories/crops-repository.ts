import { Crop } from '@/domain/erm/enterprise/entities/crop'

export abstract class CropsRepository {
  abstract create(crop: Crop): Promise<void>
  abstract createMany(crop: Crop[]): Promise<void>
}