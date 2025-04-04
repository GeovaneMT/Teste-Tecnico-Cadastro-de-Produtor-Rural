import { farmAreaValidationSchema } from '@/domain/erm/utils/farm-area-validation'

export class FarmArea {
  private value: number

  private constructor(value: number) {
    this.value = value
  }

  static create({
    farmArea,
    vegetationArea,
    agriculturalArea,
  }: {
    farmArea: number
    vegetationArea: number
    agriculturalArea: number
  }): FarmArea {
    const result = farmAreaValidationSchema.safeParse({
      farmArea,
      vegetationArea,
      agriculturalArea,
    })

    if (!result.success) {
      throw new Error(result.error.errors[0].message)
    }

    return new FarmArea(result.data.farmArea)
  }

  getValue(): number {
    return this.value
  }
}
