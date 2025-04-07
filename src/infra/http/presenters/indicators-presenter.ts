import { CropByState } from '@/domain/erm/enterprise/entities/value-objects/crop-by-state'

export class IndicatorPresenter {
  static toHTTP(indicator: CropByState) {
    return {    
      state: indicator.state,
      cropTypesWithQuantity: indicator.cropTypesWithQuantity,
    }
  }
}