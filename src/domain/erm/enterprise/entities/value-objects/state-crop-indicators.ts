import { ValueObject } from '@/core/entities/value-object'
import { CropType } from '@/domain/erm/utils/crop-type-enum'
import { States } from '@/domain/erm/utils/state-type-enum'

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
