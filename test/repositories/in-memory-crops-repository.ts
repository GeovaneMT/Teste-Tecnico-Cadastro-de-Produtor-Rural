import { DomainEvents } from '@/core/events/domain-events'

import { Crop } from '@/domain/erm/enterprise/entities/crop'
import { CropsRepository } from '@/domain/erm/application/repositories/crops-repository'

export class InMemoryCropsRepository implements CropsRepository {
  public items: Crop[] = []

  async create(crop: Crop) {
    this.items.push(crop)

    DomainEvents.dispatchEventsForAggregate(crop.id)
  }

  async createMany(crops: Crop[]) {
    for (const crop of crops) {
      this.items.push(crop)
      DomainEvents.dispatchEventsForAggregate(crop.id)
    }
  }

}