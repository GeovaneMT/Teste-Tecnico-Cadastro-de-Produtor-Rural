import { Crop } from '@/domain/erm/enterprise/entities/crop'

export abstract class CropssRepository {
  abstract create(crop: Crop): Promise<void>
}