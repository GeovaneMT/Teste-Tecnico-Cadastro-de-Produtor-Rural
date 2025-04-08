import { CropPresenter } from '@/infra/http/presenters/farm-crop-presenter'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

export class FarmDetailsPresenter {
  static toHTTP(farmDetails: FarmDetails) {
    return {
      farmId: farmDetails.farmId.toString(),
      ownerId: farmDetails.ownerId.toString(),

      name: farmDetails.name,      
      city: farmDetails.city,
      state: farmDetails.state,

      farmArea: farmDetails.farmArea,
      vegetationArea: farmDetails.vegetationArea,
      agriculturalArea: farmDetails.agriculturalArea,
      
      crops: farmDetails.farmCrops.map(CropPresenter.toHTTP),

      createdAt: farmDetails.createdAt,
      updatedAt: farmDetails.updatedAt,
    }
  }
}