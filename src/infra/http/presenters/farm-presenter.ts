import { Farm } from '@/domain/erm/enterprise/entities/farm'

export class FarmPresenter {
  static toHTTP(farm: Farm) {
    return {
      id: farm.id.toString(),
      
      name: farm.name,
      city: farm.city,
      state: farm.state,
    
      farmArea: farm.farmArea,
      vegetationArea: farm.vegetationArea,
      agriculturalArea: farm.agriculturalArea,
      
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
    }
  }
}