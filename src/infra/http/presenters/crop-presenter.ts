import { Crop } from '@/domain/erm/enterprise/entities/crop'

export class CropPresenter {
  static toHTTP(crop: Crop) {
    return {
      id: crop.id.toString(),
      
      type: crop.type,
      description: crop.description,
        
      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    }
  }
}