import { Optional } from '@/core/types/optional'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

export interface FarmProps {
  name: string
  city: string
  state: string

  farmArea: string
  vegetationArea: string
  agriculturalArea: string

  crops: FarmCropList

  createdAt: Date
  updatedAt?: Date | null
}

export class Farm extends AggregateRoot<FarmProps> {
  get name() {
    return this.props.name
  }
  
  get city() {
    return this.props.city
  }
  
  get state() {
    return this.props.state
  }

  get farmArea() {
    return this.props.farmArea
  }
  
  get vegetationArea() {
    return this.props.vegetationArea
  }
  
  get agriculturalArea() {
    return this.props.agriculturalArea
  }
  
  get crops() {
    return this.props.crops
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }
  
  set city(city: string) {
    this.props.city = city
    this.touch()
  }
  
  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  set farmArea(farmArea: string) {
    this.props.farmArea = farmArea
    this.touch()
  }
  
  set vegetationArea(vegetationArea: string) {
    this.props.vegetationArea = vegetationArea
    this.touch()
  }
  
  set agriculturalArea(agriculturalArea: string) {
    this.props.agriculturalArea = agriculturalArea
    this.touch()
  }
  
  set crops(crops: FarmCropList) {
    this.props.crops = crops
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  validateAreas(): boolean {
    const farmAreaInHectares = this.farmArea
    const agriculturalAreaInHectares = this.agriculturalArea
    const vegetationAreaInHectares = this.vegetationArea
    return agriculturalAreaInHectares + vegetationAreaInHectares <= farmAreaInHectares
  }

  static create(
    props: Optional<FarmProps, 'createdAt' | 'crops'>,
    id?: UniqueEntityID,
  ) {
    const farm = new Farm(
      {
        ...props,
        crops: props.crops ?? new FarmCropList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    if (!farm.validateAreas()) {
      throw new Error('The sum of agricultural and vegetation areas cannot be greater than the total area.')
    }

    return farm
  }

}

