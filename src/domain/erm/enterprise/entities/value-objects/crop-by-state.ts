import { CropType, States } from '@prisma/client'
import { ValueObject } from '@/core/entities/value-object'

export type CropTypeWithQuantity = {
  cropType: CropType
  total: number
}

export interface CropByStateProps {
  state: States
  cropTypesWithQuantity: CropTypeWithQuantity[]
}

export class CropByState extends ValueObject<CropByStateProps> {
  get state() {
    return this.props.state
  }

  get cropTypesWithQuantity() {
    return this.props.cropTypesWithQuantity
  }

  static create(props: CropByStateProps) {
    return new CropByState(props)
  }
}
