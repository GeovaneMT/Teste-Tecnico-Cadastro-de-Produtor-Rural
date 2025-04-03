import { CropPresenter } from '@/infra/http/presenters/crop-presenter'
import { FarmDetails } from '@/domain/erm/enterprise/entities/value-objects/farm-details'

export class FarmDetailsPresenter {
  static toHTTP(farmDetails: FarmDetails) {
    return {
      farmId: farmDetails.farmId.toString(),
      ownerId: farmDetails.ownerId.toString(),
      owner: farmDetails.owner,

      name: farmDetails.name,      
      city: farmDetails.city,
      state: farmDetails.state,

      farmArea: farmDetails.farmArea,
      vegetationArea: farmDetails.vegetationArea,
      agriculturalArea: farmDetails.agriculturalArea,
      
      crops: farmDetails.crops.map(CropPresenter.toHTTP),

      createdAt: farmDetails.createdAt,
      updatedAt: farmDetails.updatedAt,
    }
  }
}