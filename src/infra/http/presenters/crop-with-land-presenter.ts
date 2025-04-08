import { CropWithLand } from '@/domain/erm/enterprise/entities/value-objects/crop-with-land'

export class CropWithLandPresenter {
  static toHTTP(cropWithLand: CropWithLand) {
    return {
      cropId: cropWithLand.cropId.toString(),

      landId: cropWithLand.landId.toString(),
      landName: cropWithLand.land,

      type: cropWithLand.type,
      description: cropWithLand.description,

      createdAt: cropWithLand.createdAt,
      updatedAt: cropWithLand.updatedAt,
    }
  }
}