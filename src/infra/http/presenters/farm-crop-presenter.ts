import { FarmCrop } from '@/domain/erm/enterprise/entities/farm-crop'

export class CropPresenter {
  static toHTTP(crop: FarmCrop) {
    return {
      id: crop.id.toString(),
      
      type: crop.type,
      description: crop.description,
        
      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    }
  }
}