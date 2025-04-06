import { ValueObject } from '@/core/entities/value-object'
import { CropType } from '@/domain/erm/utils/crop-type-enum'

export interface CropByStateProps {
  state: string
  cropType: CropType
  total: number
}

export class CropByState extends ValueObject<CropByStateProps> {
  get state() {
    return this.props.state
  }

  get cropType() {
    return this.props.cropType
  }

  get total() {
    return this.props.total
  }

  static create(props: CropByStateProps) {
    return new CropByState(props)
  }
}
