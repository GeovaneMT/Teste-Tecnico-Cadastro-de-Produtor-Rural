import { States } from '@prisma/client'

import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FarmCropList } from '@/domain/erm/enterprise/entities/farm-crop-list'

import { FarmArea } from '@/domain/erm/enterprise/entities/value-objects/farm-area'

export interface FarmProps {
  name: string
  city: string
  state: States

  farmArea: FarmArea
  vegetationArea: string
  agriculturalArea: string

  crops: FarmCropList

  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Farm<Props extends FarmProps> extends AggregateRoot<Props> {

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

  get excerpt() {
    return this.name.substring(0, 120).trimEnd().concat('...')
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }
  
  set city(city: string) {
    this.props.city = city
    this.touch()
  }
  
  set state(state: States) {
    this.props.state = state
    this.touch()
  }

  set farmArea(farmArea: FarmArea) {
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

}