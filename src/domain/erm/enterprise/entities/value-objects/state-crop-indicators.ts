import { ValueObject } from '@/core/entities/value-object'
import { CropType, States } from '@prisma/client'

export interface StateCropIndicatorsProps {
  state: States
  cropType: CropType
  total: number
}

export class StateCropIndicators extends ValueObject<StateCropIndicatorsProps> {
  get state() {
    return this.props.state
  }

  get cropType() {
    return this.props.cropType
  }

  get total() {
    return this.props.total
  }

  static create(props: StateCropIndicatorsProps) {
    return new StateCropIndicators(props)
  }
}
