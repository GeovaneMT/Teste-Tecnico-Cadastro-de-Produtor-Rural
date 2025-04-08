import { FarmWithOwner } from '@/domain/erm/enterprise/entities/value-objects/farm-with-owner'

export class FarmWithOwnerPresenter {
  static toHTTP(farmWithOwner: FarmWithOwner) {
    return {
      farmId: farmWithOwner.farmId.toString(),

      ownerId: farmWithOwner.ownerId.toString(),
      ownerName: farmWithOwner.owner,
      
      name: farmWithOwner.name,
      city: farmWithOwner.city,
      state: farmWithOwner.state,

      farmArea: farmWithOwner.farmArea,
      vegetationArea: farmWithOwner.vegetationArea,
      agriculturalArea: farmWithOwner.agriculturalArea,
      
      crops: farmWithOwner.crops,
      
      createdAt: farmWithOwner.createdAt,
      updatedAt: farmWithOwner.updatedAt,
    }
  }
}