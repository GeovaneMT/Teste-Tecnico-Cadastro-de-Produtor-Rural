import { ProducerFarm } from '@/domain/erm/enterprise/entities/producer-farm'

export class FarmPresenter {
  static toHTTP(farm: ProducerFarm) {
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